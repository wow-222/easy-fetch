import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
	if (!headers) return
	Object.keys(headers).forEach(name => {
		if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
			headers[normalizedName] = headers[name]
			delete headers[name]
		}
	})
}

export function processHeaders(headers: any, data: any): any {
	normalizeHeaderName(headers, 'Content-type')

	if (isPlainObject(data)) {
		if (headers && !headers['Content-type']) {
			headers['Content-type'] = 'application/json;charset=utf-8'
		}
	}
	return headers
}

export function parseHeaders(headers: string): any {
	const parsed = Object.create(null)
	if (headers) {
		headers.split('\r\n').forEach(line => {
			let [key, val] = line.split(':')
			key = key.trim().toLowerCase()
			if (!key) {
				return
			}
			if (val) {
				val = val.trim()
			}
			parsed[key] = val
		})
	}
	return parsed
}
