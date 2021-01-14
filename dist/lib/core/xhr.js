"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = require("../helpers/headers");
var error_1 = require("../helpers/error");
function xhr(config) {
    return new Promise(function (resolve, reject) {
        var url = config.url, _a = config.data, data = _a === void 0 ? null : _a, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout;
        var request = new XMLHttpRequest();
        if (responseType) {
            request.responseType = responseType;
        }
        if (timeout) {
            request.timeout = timeout;
        }
        request.open(method.toUpperCase(), url, true);
        request.onerror = function handleError() {
            reject(error_1.createError('Network Error', config, null, request));
        };
        request.ontimeout = function handleTimeout() {
            reject(error_1.createError("Timeout of " + timeout + " ms exceeded", config, 'ECONNABORTED', request));
        };
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4 || request.status === 0) {
                return;
            }
            var responseHeaders = headers_1.parseHeaders(request.getAllResponseHeaders());
            var responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            handleResponse(response);
        };
        Object.keys(headers).forEach(function (name) {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            }
            else {
                request.setRequestHeader(name, headers[name]);
            }
        });
        function handleResponse(response) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                reject(error_1.createError("Request failed with  status code " + response.status, config, null, request, response));
            }
        }
        request.send(data);
    });
}
exports.default = xhr;
