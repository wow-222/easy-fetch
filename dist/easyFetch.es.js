var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
// 交叉类型 实际上就是合并对象
function extend(to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
    return to;
}

function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
function buildURL(url, params) {
    if (!params)
        return url;
    var parts = [];
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        if (val === null || typeof val === 'undefined')
            return;
        var values = [];
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            values = [val];
        }
        values.forEach(function (_val) {
            if (isDate(_val)) {
                _val = _val.toISOString();
            }
            else if (isPlainObject(_val)) {
                _val = JSON.stringify(_val);
            }
            parts.push(encode(key) + "=" + encode(_val));
        });
    });
    var serializedParams = parts.join('&');
    if (serializedParams) {
        var markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            url = url.slice(0, markIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}

function transformRequest(data) {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
function transformResponse(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            // do nothing
        }
    }
    return data;
}

function normalizeHeaderName(headers, normalizedName) {
    if (!headers)
        return;
    Object.keys(headers).forEach(function (name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    });
}
function processHeaders(headers, data) {
    normalizeHeaderName(headers, 'Content-type');
    if (isPlainObject(data)) {
        if (headers && !headers['Content-type']) {
            headers['Content-type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
function parseHeaders(headers) {
    var parsed = Object.create(null);
    if (headers) {
        headers.split('\r\n').forEach(function (line) {
            var _a = line.split(':'), key = _a[0], val = _a[1];
            key = key.trim().toLowerCase();
            if (!key) {
                return;
            }
            if (val) {
                val = val.trim();
            }
            parsed[key] = val;
        });
    }
    return parsed;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var EasyFetchError = /** @class */ (function (_super) {
    __extends(EasyFetchError, _super);
    function EasyFetchError(message, config, code, request, response) {
        var _this = _super.call(this, message) || this;
        _this.config = config;
        _this.code = code;
        _this.request = request;
        _this.response = response;
        _this.isEasyFetchError = true;
        Object.setPrototypeOf(_this, EasyFetchError.prototype);
        return _this;
    }
    return EasyFetchError;
}(Error));
function createError(message, config, code, request, response) {
    var error = new EasyFetchError(message, config, code, request, response);
    return error;
}

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
            reject(createError('Network Error', config, null, request));
        };
        request.ontimeout = function handleTimeout() {
            reject(createError("Timeout of " + timeout + " ms exceeded", config, 'ECONNABORTED', request));
        };
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4 || request.status === 0) {
                return;
            }
            var responseHeaders = parseHeaders(request.getAllResponseHeaders());
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
                reject(createError("Request failed with  status code " + response.status, config, null, request, response));
            }
        }
        request.send(data);
    });
}

function dispatchRequest(config) {
    processConfig(config);
    return xhr(config).then(function (res) { return transformResponseData(res); });
}
function processConfig(config) {
    config.url = transformURL(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return buildURL(url, params);
}
function transformRequestData(config) {
    return transformRequest(config.data);
}
function transformHeaders(config) {
    return processHeaders(config.headers || {}, config.data);
}
function transformResponseData(res) {
    res.data = transformResponse(res.data);
    return res;
}

var EasyFetch = /** @class */ (function () {
    function EasyFetch() {
    }
    EasyFetch.prototype.request = function (config) {
        return dispatchRequest(config);
    };
    return EasyFetch;
}());

function createInstance() {
    var context = new EasyFetch();
    var instance = EasyFetch.prototype.request.bind(context);
    extend(instance, context);
    return instance;
}
var easyFetch = createInstance();

export default easyFetch;
