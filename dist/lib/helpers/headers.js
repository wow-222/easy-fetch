"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeaders = exports.processHeaders = void 0;
var util_1 = require("./util");
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
    if (util_1.isPlainObject(data)) {
        if (headers && !headers['Content-type']) {
            headers['Content-type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
exports.processHeaders = processHeaders;
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
exports.parseHeaders = parseHeaders;
