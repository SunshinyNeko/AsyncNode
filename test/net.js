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
require('../async-node');
// let socket = net.connect(80, 'echo.jpillora.com', async () => {
//   let write = await socket.writeAsync(new Buffer('GET / HTTP 1.0'));
//   console.log('write completed ' + write);
//   let buf = await socket.onceAsync();
//   console.log('length: ' + buf.length + ' ' + buf);
// });
// socket.on('data', (data) => console.log(data.toString('utf8')));
// socket.on('error', (err) => console.log(err));
function h() {
    return __awaiter(this, void 0, Promise, function* () {
        let socket2 = new net.Socket();
        socket2.on('error', (err) => console.log(err));
        socket2.on('close', () => console.log('close'));
        let bc = yield socket2.connectAsync(3002, 'localhost');
        console.log(yield socket2.writeAsync(new Buffer('GET / HTTP 1.0\n', 'utf8')));
        let buf = yield socket2.readAsync();
        console.log(buf.toString('utf8'));
        yield socket2.writeAsync(new Buffer('balabala\n', 'utf8'));
        buf = yield socket2.readAsync();
        console.log(buf.toString('utf8'));
        socket2.end();
    });
}
h();
