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
// --------------------------------- net ---------------------------------
var net = require('net');
net.Socket.prototype.connectAsync = function () {
    return __awaiter(this, arguments, Promise, function* (_arguments) {
        let _this = this;
        let socketArgs = Array.from(_arguments);
        return new Promise(resolve => {
            let errorHandler = (error) => resolve(false);
            let finishHandler = () => {
                socket.removeListener('error', errorHandler);
                resolve(true);
            };
            let args = socketArgs.concat(finishHandler);
            var socket = net.Socket.prototype.connect.apply(_this, args);
            socket.on('error', errorHandler);
        });
    });
};
net.Socket.prototype.writeAsync = function () {
    return __awaiter(this, arguments, Promise, function* (_arguments) {
        let _this = this;
        let socketArgs = Array.from(_arguments);
        return new Promise(resolve => {
            let finishHandler = () => resolve(flushed);
            let args = socketArgs.concat(finishHandler);
            var flushed = net.Socket.prototype.write.apply(_this, args);
        });
    });
};
net.Socket.prototype.readAsync = function () {
    return __awaiter(this, void 0, Promise, function* () {
        let _this = this;
        return new Promise((resolve, reject) => {
            let errorHandler = (err) => reject(null);
            let dataHandler = (data) => {
                _this.removeListener('error', errorHandler);
                resolve(data);
            };
            let args = ['data', dataHandler];
            net.Socket.prototype.once.apply(_this, args);
            _this.on('data', errorHandler);
        });
    });
};
