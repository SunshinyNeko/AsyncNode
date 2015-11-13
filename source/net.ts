//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------

'use strict'

import * as net from 'net';
export type Socket = net.Socket;

export module AsyncNet {
  
  export async function connectAsync(port, host): Promise<Socket> {
    return new Promise<Socket>((resolve, reject) => {
      let socket = net.connect(port, host, () => {
        socket.removeListener('error', errorHandler);
        resolve(socket);
      });
      
      var errorHandler = (err: Error) => reject(socket);
      socket.once('error', errorHandler);
    });
  }
  
}