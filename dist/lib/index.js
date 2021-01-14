"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EasyFetch_1 = require("./core/EasyFetch");
var util_1 = require("./helpers/util");
function createInstance() {
    var context = new EasyFetch_1.default();
    var instance = EasyFetch_1.default.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var easyFetch = createInstance();
exports.default = easyFetch;
