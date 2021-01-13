import { EasyFetchRequestConfig, EasyFetchResponse } from '../types/index'

export class EasyFetchError extends Error {
  isEasyFetchError: boolean
  config: EasyFetchRequestConfig
  code?: string | null
  request?: any
  response?: EasyFetchResponse

  constructor(
    message: string,
    config: EasyFetchRequestConfig,
    code?: string | null,
    request?: any,
    response?: EasyFetchResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isEasyFetchError = true

    Object.setPrototypeOf(this, EasyFetchError.prototype)
  }
}

export function createError(
  message: string,
  config: EasyFetchRequestConfig,
  code?: string | null,
  request?: any,
  response?: EasyFetchResponse
): EasyFetchError {
  const error = new EasyFetchError(message, config, code, request, response)

  return error
}
