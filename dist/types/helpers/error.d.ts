import { EasyFetchRequestConfig, EasyFetchResponse } from "../types/index";
export declare class EasyFetchError extends Error {
    isEasyFetchError: boolean;
    config: EasyFetchRequestConfig;
    code?: string | null;
    request?: any;
    response?: EasyFetchResponse;
    constructor(message: string, config: EasyFetchRequestConfig, code?: string | null, request?: any, response?: EasyFetchResponse);
}
export declare function createError(message: string, config: EasyFetchRequestConfig, code?: string | null, request?: any, response?: EasyFetchResponse): EasyFetchError;
