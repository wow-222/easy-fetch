export declare type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' | 'post' | 'POST' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH';
export interface EasyFetchRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}
export interface EasyFetchResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: EasyFetchRequestConfig;
    request: any;
}
export interface EasyFetchPromise extends Promise<EasyFetchResponse> {
}
interface EasyFetch {
    request(config: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    get(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    delete(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    head(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    options(url: string, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    post(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    put(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
    patch(url: string, data?: any, config?: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
}
/** 混合工厂接口 */
export interface EasyFetchInstance extends EasyFetch {
    (config: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
}
export {};
