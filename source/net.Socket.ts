//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------

'use strict'

import * as net from 'net';


export declare interface BaseConnectionOptions { 
  port: number, 
  host?: string, 
  localAddress?: string, 
  localPort?: number, 
  family?: number, 
};

export declare interface ServerConnectionOptions extends BaseConnectionOptions {
  allowHalfOpen?: boolean
}

export declare interface SocketConnectionOptions extends BaseConnectionOptions {
  lookup?: any  
}

export declare interface UnixDomainConnectionOptions extends BaseConnectionOptions {
  path?: string, 
}

const Socket = net.Socket;

export interface ISocketAsync {
   connectAsync(path: string): Promise<net.Socket>;
   connectAsync(port: number, host: string): Promise<net.Socket>;
   connectAsync(options: SocketConnectionOptions): Promise<net.Socket>;
   writeAsync(data): Promise<boolean>;
   writeAsync(data, encoding): Promise<boolean>;
   onceAsync(): Promise<Buffer>;
}

// export net.Socket extends
Socket.prototype.connectAsync = async function() {
  return new Promise<net.Socket>((resolve, reject) => {
    let errorHandler = (error: Error) => reject(null); 
    let socket = this.connect(arguments[0], arguments[1], () => {
      socket.removeListener('error', errorHandler);
      resolve(socket);
    });
    socket.once('error', errorHandler);
  });
}

Socket.prototype.writeAsync = async function() {
  let _this = this;
  let socketArgs = Array.from(arguments);
  
  return new Promise<boolean>(resolve => {
    let writeFinished = () => resolve(flushed);
    let args = socketArgs.concat(writeFinished);
    var flushed = Socket.prototype.write.apply(_this, args);
  });
}

Socket.prototype.onceAsync = async function(): Promise<Buffer> {
  return new Promise<Buffer>(resolve => {
    this.once('data', (data) => {
      resolve(data);
    });
  });
}

export declare interface Socket extends ISocketAsync {}
