import { dispatchRequest } from './dispatchRequest'
import { EasyFetchResponse, EasyFetchRequestConfig} from '../types'
export default class EasyFetch {
	request(config: EasyFetchRequestConfig): Promise<EasyFetchResponse> {
		return dispatchRequest(config)
	}
}