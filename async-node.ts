//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------

'use strict'

// --------------------------------- net ---------------------------------

import * as net from 'net';

export interface ISocketAsync {
   connectAsync(path: string): Promise<boolean>;
   connectAsync(port: number, host: string): Promise<boolean>;
   writeAsync(data: Buffer): Promise<boolean>;
   writeAsync(data: Buffer, encoding: string): Promise<boolean>;
   readAsync(): Promise<Buffer>;
}

export declare interface Socket extends ISocketAsync {}

net.Socket.prototype.connectAsync = async function() {
  let _this = this;
  let socketArgs = Array.from(arguments);
  
  return new Promise<boolean>((resolve, reject) => {
    let errorHandler = (error: Error) => reject(false);
    let finishHandler = () => {
      socket.removeListener('error', errorHandler);
      resolve(true);
    };
    
    let args = socketArgs.concat(finishHandler);
    var socket = net.Socket.prototype.connect.apply(_this, args);
    socket.once('error', errorHandler);
  });
}

net.Socket.prototype.writeAsync = async function() {
  let _this = this;
  let socketArgs = Array.from(arguments);
  
  return new Promise<boolean>(resolve => {
    let finishHandler = () => resolve(flushed);
    let args = socketArgs.concat(finishHandler);
    var flushed = net.Socket.prototype.write.apply(_this, args);
  });
}

net.Socket.prototype.readAsync = async function(): Promise<Buffer> {
  let _this = this;
  return new Promise<Buffer>(resolve => {
    let dataHandler = (data: Buffer) => resolve(data);
    let args = ['data', dataHandler];
    net.Socket.prototype.once.apply(_this, args);
  });
}

