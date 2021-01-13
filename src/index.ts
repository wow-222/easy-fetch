import EasyFetch from './core/EasyFetch'
import { EasyFetchInstance } from './types'
import { extend } from './helpers/util'

function createInstance(): EasyFetchInstance {
	const context = new EasyFetch()
	const instance = EasyFetch.prototype.request.bind(context)
	extend(instance, context)
	return instance as EasyFetchInstance
}

const easyFetch = createInstance()
export default easyFetch
