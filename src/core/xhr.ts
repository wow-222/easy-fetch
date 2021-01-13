import { parseHeaders } from '../helpers/headers'
import { EasyFetchRequestConfig, EasyFetchResponse } from '../types'
import { createError } from '../helpers/error'

export default function xhr(config: EasyFetchRequestConfig): Promise<EasyFetchResponse> {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4 || request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: EasyFetchResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    function handleResponse(response: EasyFetchResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with  status code ${response.status}`, config, null, request, response))
      }
    }

    request.send(data)
  })
}
