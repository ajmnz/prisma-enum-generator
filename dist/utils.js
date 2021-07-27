"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLower = void 0;
var firstLower = function (s) {
    return s.replace(/(^\w{1})|(\s+\w{1})/g, function (letter) { return letter.toLowerCase(); });
};
exports.firstLower = firstLower;
//# sourceMappingURL=utils.js.map