"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchRequest = void 0;
var url_1 = require("../helpers/url");
var data_1 = require("../helpers/data");
var headers_1 = require("../helpers/headers");
var xhr_1 = require("./xhr");
function dispatchRequest(config) {
    processConfig(config);
    return xhr_1.default(config).then(function (res) { return transformResponseData(res); });
}
exports.dispatchRequest = dispatchRequest;
function processConfig(config) {
    config.url = transformURL(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}
function transformURL(config) {
    var url = config.url, params = config.params;
    return url_1.buildURL(url, params);
}
function transformRequestData(config) {
    return data_1.transformRequest(config.data);
}
function transformHeaders(config) {
    return headers_1.processHeaders(config.headers || {}, config.data);
}
function transformResponseData(res) {
    res.data = data_1.transformResponse(res.data);
    return res;
}
