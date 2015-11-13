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
require('../source/net.Socket');
var net = require('net');
let socket = net.connect(80, 'baidu.com', () => __awaiter(this, void 0, Promise, function* () {
    console.log('ccc');
    yield socket.writeAsync('GET / HTTP 1.0', 'utf8');
    console.log('write completed');
    let buf = yield socket.onceAsync();
    console.log(buf.toString('utf8'));
}));
