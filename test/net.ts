'use strict'

require('../source/net.Socket');
import * as net from 'net';

let socket = net.connect(80, 'baidu.com', async () => {
  console.log('ccc');
  await socket.writeAsync('GET / HTTP 1.0', 'utf8');
  console.log('write completed');
  let buf = await socket.onceAsync();
  console.log(buf.toString('utf8'));
});