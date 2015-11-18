//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------

'use strict'

// --------------------------------- net ---------------------------------

import * as net from 'net';

export interface ISocketAsync {
   connectAsync(path: string): Promise<boolean>;
   connectAsync(port: number, host: string): Promise<boolean>;
   writeAsync(data: string): Promise<boolean>;
   writeAsync(data: Buffer): Promise<boolean>;
   writeAsync(data: Buffer, encoding: string): Promise<boolean>;
   readAsync(): Promise<Buffer>;
}

export declare interface Socket extends ISocketAsync {}

net.Socket.prototype.connectAsync = async function() {
  let _this = this;
  let socketArgs = Array.from(arguments);
  
  return new Promise<boolean>(resolve => {
    let errorHandler = (error: Error) => resolve(false);
    let finishHandler = () => {
      socket.removeListener('error', errorHandler);
      resolve(true);
    };
    
    let args = socketArgs.concat(finishHandler);
    var socket = net.Socket.prototype.connect.apply(_this, args);
    socket.on('error', errorHandler);
  });
}

net.Socket.prototype.writeAsync = async function(): Promise<boolean> {
  let _this = this;
  let socketArgs = Array.from(arguments);
  
  return new Promise<boolean>(resolve => {
    let finishHandler = () => resolve(flushed);
    let args = socketArgs.concat(finishHandler);
    var flushed = net.Socket.prototype.write.apply(_this, args);
  });
}

net.Socket.prototype.readAsync = async function(): Promise<Buffer> {
  let _this = <net.Socket>this;
  return new Promise<Buffer>((resolve, reject) => {
    let errorHandler = (err: Error) => reject(null);
    let dataHandler = (data: Buffer) => {
      _this.removeListener('error', errorHandler);
      resolve(data);
    };
    
    let args = ['data', dataHandler];
    net.Socket.prototype.once.apply(_this, args);
    _this.on('data', errorHandler);
  });
}