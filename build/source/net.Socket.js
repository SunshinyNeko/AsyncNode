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
;
const Socket = net.Socket;
// export net.Socket extends
Socket.prototype.connectAsync = function () {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve, reject) => {
            let errorHandler = (error) => reject(null);
            let socket = this.connect(arguments[0], arguments[1], () => {
                socket.removeListener('error', errorHandler);
                resolve(socket);
            });
            socket.once('error', errorHandler);
        });
    });
};
Socket.prototype.writeAsync = function () {
    return __awaiter(this, arguments, Promise, function* (_arguments) {
        let _this = this;
        let socketArgs = Array.from(_arguments);
        return new Promise(resolve => {
            let writeFinished = () => resolve(flushed);
            let args = socketArgs.concat(writeFinished);
            var flushed = Socket.prototype.write.apply(_this, args);
        });
    });
};
Socket.prototype.onceAsync = function () {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise(resolve => {
            this.once('data', (data) => {
                resolve(data);
            });
        });
    });
};
