"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.EasyFetchError = void 0;
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
exports.EasyFetchError = EasyFetchError;
function createError(message, config, code, request, response) {
    var error = new EasyFetchError(message, config, code, request, response);
    return error;
}
exports.createError = createError;
