interface IQueryParams {
    [key: string]: string
}

export function getQueryParams(url: string): IQueryParams {

    let queryParams: IQueryParams = {}
    let splitedUrl = url.split('?')
    let params = splitedUrl[1].split('&')

    for (let index in params) {
        let splitedParam = params[index].split('=')
        let parameterObject: IQueryParams = {}
        parameterObject[`${splitedParam[0]}`] = splitedParam[1]

        queryParams = Object.assign(queryParams, parameterObject)
    }

    return queryParams
}

function queryParamsHandling(queryParams: [string, any]): string {
    let key = queryParams[0]
    let value = queryParams[1]
    if (Array.isArray(value)) {
        let paramString = ''
        for (let i = 0; i < value.length; i++) {
            if (i == 0) paramString = `${paramString}${key}=${value[i]}`
            else paramString = `${paramString}&${key}=${value[i]}`
        }
        return paramString
    } else {
        return `${key}=${value}`
    }
}

export function addQueryParamsToURL(url: string, params: any): string {
    let newURL = url;
    if (params) {
        const queryParams = Object.entries(params) as [string, any]
        for (let i = 0; i < queryParams.length; i++) {
            const paramString = queryParamsHandling(queryParams[i])
            if (i === 0) {
                newURL += '?' + paramString
            } else {
                newURL += '&' + paramString
            }
        }
    }
    return newURL;
}