//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var net = require('net');
var AsyncNet;
(function (AsyncNet) {
    function connectAsync(port, host) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve, reject) => {
                let socket = net.connect(port, host, () => {
                    socket.removeListener('error', errorHandler);
                    resolve(socket);
                });
                var errorHandler = (err) => reject(socket);
                socket.once('error', errorHandler);
            });
        });
    }
    AsyncNet.connectAsync = connectAsync;
})(AsyncNet = exports.AsyncNet || (exports.AsyncNet = {}));
