"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatchRequest_1 = require("./dispatchRequest");
var EasyFetch = /** @class */ (function () {
    function EasyFetch() {
    }
    EasyFetch.prototype.request = function (config) {
        return dispatchRequest_1.dispatchRequest(config);
    };
    return EasyFetch;
}());
exports.default = EasyFetch;
