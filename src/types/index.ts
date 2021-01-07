export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'post' | 'POST'
  | 'options' | 'OPTIONS'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface EasyFetchRequestConfig {
	url: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

export interface EasyFetchResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: EasyFetchRequestConfig
  request: any
}

export type EasyFetchPromise = Promise<EasyFetchResponse>

// 这里是给外部用的，内部没啥用
interface EasyFetchError extends Error {
  config: EasyFetchRequestConfig
  code?: string
  request?: any
  response?: EasyFetchResponse
  isEasyFetchError: boolean
}


interface EasyFetch {
  request(config: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  get(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  delete(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  head(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  options(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  post(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  put(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>

  patch(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>
}

/** 混合工厂接口 */
export interface EasyFetchInstance extends EasyFetch {
  (config: EasyFetchRequestConfig): Promise<EasyFetchResponse>
}