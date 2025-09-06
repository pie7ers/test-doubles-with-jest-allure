import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import https from 'https'
import { TimeDifference } from '../../utils/dateTime'
import CONSTANTS from '../../consts/server'
import { WriteCurlLog, AppendFileLog, IFILE_PARAMS } from '../../utils/logs'

const MS_ERROR_CONNECTION = `Error: could not get a response, please check your connections`
const SERVICE_UNAVAILABLE = 503

export interface IRESPONSE {
    request?: AxiosRequestConfig,
    status?: number,
    statusText?: string,
    method?: string,
    headers?: Record<string, any>,
    url?: string,
    data?: Record<string, any>,
    responseTime?: number,
    timeout?: number,
}

class HttpRequest {

    config: AxiosRequestConfig = {} as AxiosRequestConfig
    private startTime = new Date()
    private endTime = new Date()
    private responseTime: number = 0
    response: IRESPONSE = {} as IRESPONSE

    private DebugServiceConsole(): void {
        const fileParams: IFILE_PARAMS = {
            fileName: "logs",
            path: "requests",
        }
        const request: object = {
            method: this.config.method,
            url: this.config.url,
            headers: this.config.headers,
            payload: this.config.data,
        }
        const response: object = {
            status: this.response?.status,
            statusText: this.response?.statusText,
            responseTime: this.response?.responseTime,
            data: this.response?.data,
            headers: this.response?.headers,
        }
        const content: object = {
            request,
            response
        }
        AppendFileLog(fileParams, JSON.stringify(content))
    }

    private setResponseTime(startTime: Date, endTime: Date): void {
        this.responseTime = TimeDifference(startTime, endTime)
    }

    private disableSSLCertificationAxios(): void {
        if (!CONSTANTS?.DISABLE_SSL_CERTIFICATION_AXIOS) {
            let agent = new https.Agent({
                rejectUnauthorized: false
            })
            this.config.httpsAgent = agent
        }
    }

    private responseErrorControl(error: any): IRESPONSE {
        if (!error?.response?.status) {
            let message = error.code === 'ECONNREFUSED' ? MS_ERROR_CONNECTION : error.message
            return {
                status: SERVICE_UNAVAILABLE,
                statusText: "Service Unavailable",
                data: {
                    message: message
                } as IRESPONSE,
            }
        }
        return {} as IRESPONSE
    }

    async makeRequest(config: AxiosRequestConfig): Promise<IRESPONSE> {

        this.config = config
        this.config.timeout = this.config.timeout ? this.config.timeout : CONSTANTS?.DEFAULT_TIMEOUT
        this.disableSSLCertificationAxios()
        WriteCurlLog(this.config)
        try {
            this.startTime = new Date()
            let response: AxiosResponse = await axios(this.config)
            this.endTime = new Date()
            this.setResponseTime(this.startTime, this.endTime)
            this.response = {
                request: config,
                status: response?.status,
                statusText: response?.statusText,
                method: response?.config?.method,
                headers: Object.fromEntries(response?.config?.headers),
                data: response?.data,
                responseTime: this.responseTime,
                timeout: response?.config?.timeout || 0,
            } as IRESPONSE
            this.DebugServiceConsole()
            return this.response
        } catch (error: any) {

            let errorControl: IRESPONSE = this.responseErrorControl(error)
            this.endTime = new Date()
            this.response = error.response === undefined ? errorControl : error.response
            this.setResponseTime(this.startTime, this.endTime)
            this.DebugServiceConsole()
            let headers = error?.response?.config?.headers ? Object.fromEntries(error?.response?.config?.headers) : {}

            return {
                request: config,
                status: error?.response?.status || errorControl.status,
                statusText: error?.response?.statusText || errorControl.statusText,
                method: error?.response?.config?.method || this.config.method,
                headers: headers,
                data: error?.response?.data || errorControl.data,
                responseTime: this.responseTime,
            } as IRESPONSE
        }
    }
}

export default HttpRequest