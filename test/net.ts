'use strict'

import * as net from 'net';
require('../async-node');

// let socket = net.connect(80, 'echo.jpillora.com', async () => {
//   let write = await socket.writeAsync(new Buffer('GET / HTTP 1.0'));
//   console.log('write completed ' + write);
//   let buf = await socket.onceAsync();
//   console.log('length: ' + buf.length + ' ' + buf);
// });

// socket.on('data', (data) => console.log(data.toString('utf8')));
// socket.on('error', (err) => console.log(err));

async function h() {
  let socket2 = new net.Socket();
  socket2.on('error', (err) => console.log(err));
  socket2.on('close', () => console.log('close'));
  let bc = await socket2.connectAsync(3002, 'localhost');
  console.log('connect: ' + bc);
  
  async function delay(time: number) {
    return new Promise<void>(resolve => {
      setTimeout(resolve, time);
    });
  }
  
  
  for (let i = 0; i < 100000; i++) {
    let mem = process.memoryUsage();
    Object.getOwnPropertyNames(mem).forEach(n => mem[n] = mem[n] / 1024 / 1024);
    let msg = JSON.stringify(process.memoryUsage());
    await socket2.writeAsync(new Buffer(msg));
    let buf = await socket2.readAsync();
    console.log(i + ' ' + buf.toString('utf8'));
    await delay(20);  
  }
  // console.log();
  // let buf = await socket2.readAsync();
  // console.log(buf.toString('utf8'));
  // await socket2.writeAsync(new Buffer('balabala\n', 'utf8'));
  // buf = await socket2.readAsync();
  // console.log(buf.toString('utf8'));
  socket2.end();
}

h();

process.title = 'async test';