import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { EasyFetchRequestConfig, EasyFetchResponse } from '../types'
import xhr from './xhr'

export function dispatchRequest(config: EasyFetchRequestConfig): Promise<EasyFetchResponse> {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: EasyFetchRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: EasyFetchRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: EasyFetchRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: EasyFetchRequestConfig): any {
  return processHeaders(config.headers || {}, config.data)
}

function transformResponseData(res: EasyFetchResponse): EasyFetchResponse {
  res.data = transformResponse(res.data)
  return res
}
