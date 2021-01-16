# easy-fetch
Promise based using XMLHttpRequest to get data

## Install
```console
npm install easy-fetch-wow -S
```

## Usage
```js
import easyFetch from 'easy-fetch-wow'

easyFetch({
	url: './test.json',
	method: 'post',
	params: {
		a: 1,
		b: 2
	}
}).then(res => {
	console.log(res)
}).catch(e => {
	console.log(e.response)
})
```
