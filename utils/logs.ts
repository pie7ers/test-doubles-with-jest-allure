import * as fs from 'fs'
import CONSTANTS from '../consts/server'
import * as path from 'path'
import { mkdir } from './commands'
import moment from 'moment'
import { DoesTheFileExist } from './filesControl'
import { AxiosRequestConfig } from 'axios'

const PROJECT_PATH: string = path.join(__dirname, '../')
const MAIN_FOLDER_LOG_NAME = 'Log'

export interface IFILE_PARAMS {
    fileName: string,
    path: string,
    extension?: string | "log",
}

const defaultFileParams: IFILE_PARAMS = {
    fileName: 'cURL',
    path: 'cURLs',
    extension: 'log'
}

function GetMainPath(path: string): string {
    return `${PROJECT_PATH}${MAIN_FOLDER_LOG_NAME}/${path}`
}

export function AppendFile(path: string, content: string, enableLog: boolean = CONSTANTS.ENABLE): void {
    fs.appendFile(path, content, (error) => {
        if (error) console.log(error)
        else {
            if (enableLog) console.log(`\nFile Content after append in ${path}: \n `, `${content}`)
        }
    })
}

export function AppendFileLog(fileParams: IFILE_PARAMS, fileContent: string): void {

    let mainPath = GetMainPath(fileParams.path)

    if (!DoesTheFileExist(mainPath)) mkdir(mainPath)

    let destinationPath = `${mainPath}/${fileParams.fileName}.${fileParams.extension || 'log'}`
    AppendFile(destinationPath, fileContent + '\n', CONSTANTS.DISABLE)
}

export function MakeCurl(config: AxiosRequestConfig, printInTerminal: boolean = true): string {
    let curl = `curl --location --request ${config.method} '${config.url}' \ `
    let headers = config?.headers ? Object.values(config?.headers) : []
    let keysHeaders = config?.headers ? Object.keys(config?.headers) : []
    let headGroup = ''
    for (let header = 0; header < keysHeaders.length; header++) {

        let headersCurl = `--header '${keysHeaders[header]}: ${headers[header]}' \ `
        headGroup = `${headGroup}\n` + headersCurl
    }

    let dataRaw = config.data !== undefined ? `--data-raw '${JSON.stringify(config.data, null, 4)}'` : ''
    //This replaces are for SOAP services
    dataRaw = dataRaw.replaceAll('\\n', '').replaceAll('\\', '')

    let curlFull = curl + headGroup + '\n' + dataRaw
    if (printInTerminal) console.log(curlFull)

    return curlFull
}

export function WriteCurlLog(config: AxiosRequestConfig, fileParams: IFILE_PARAMS = defaultFileParams): void {
    const curlContent = MakeCurl(config, false) + '\n'
    let now = new Date()
    let dateTime = moment(now).format('YYYY-MM-DD_HH:mm:ss') + `\n`
    let content = dateTime + curlContent
    AppendFileLog(fileParams, content)
}