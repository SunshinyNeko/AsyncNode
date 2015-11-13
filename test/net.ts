'use strict'

require('../source/async');
import * as net from 'net';

// let socket = net.connect(80, 'echo.jpillora.com', async () => {
//   let write = await socket.writeAsync(new Buffer('GET / HTTP 1.0'));
//   console.log('write completed ' + write);
//   let buf = await socket.onceAsync();
//   console.log('length: ' + buf.length + ' ' + buf);
// });

// socket.on('data', (data) => console.log(data.toString('utf8')));
// socket.on('error', (err) => console.log(err));

async function h() {
  console.log('Hahaha');
  let socket2 = new net.Socket();
  socket2.on('error', (err) => console.log(err));
  socket2.on('close', () => console.log('close'));
  let bc = await socket2.connectAsync(80, 'ip.cn');
  console.log('connect: ' + bc);
  await socket2.writeAsync(new Buffer('GET / HTTP 0.9'));
  await socket2.writeAsync(new Buffer('\n'));
  let buf = await socket2.readAsync();
  console.log(buf.toString('utf8'));
}

h();