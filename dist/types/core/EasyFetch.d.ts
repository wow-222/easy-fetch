import { EasyFetchResponse, EasyFetchRequestConfig } from "../types";
export default class EasyFetch {
    request(config: EasyFetchRequestConfig): Promise<EasyFetchResponse>;
}
