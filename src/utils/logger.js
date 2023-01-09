"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWarning = exports.LogInfo = exports.LogError = exports.LogSuccess = void 0;
var LogSuccess = function (message) {
    console.log("Success: , ".concat(message));
};
exports.LogSuccess = LogSuccess;
var LogError = function (message) {
    console.log("Error: , ".concat(message));
};
exports.LogError = LogError;
var LogInfo = function (message) {
    console.log("Info: , ".concat(message));
};
exports.LogInfo = LogInfo;
var LogWarning = function (message) {
    console.log("Warning: , ".concat(message));
};
exports.LogWarning = LogWarning;
