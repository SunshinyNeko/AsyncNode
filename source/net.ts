//-----------------------------------
// Copyright(c) 2015 猫王子
//-----------------------------------

'use strict'
// import * as net from 'net';
// const net = require('net');
import * as net from 'net';

module Network {
  const Socket = net.Socket;
  
  type Socket = net.Socket;
  export declare type ConnectOptions = { 
    port: number, 
    host: string, 
    path?: string, 
    localAddress?: string, 
    localPort?: number, 
    family?: number, 
    lookup?: Function 
  };
  
  Socket.prototype.createConnectionAsync = async function(options: ConnectOptions): Promise<Socket> {
    return await this.connectAsync(options);
  }
  
  Socket.prototype.createConnectionAsync = async function(port: number, host: string): Promise<Socket> {
    return await this.connectAsync(port, host);
  }
  
  Socket.prototype.createConnectionAsync = async function(path: string): Promise<Socket> {
    return await this.connectAsync({ path });
  }
  
  Socket.prototype.connectAsync = async function(port: number, host: string): Promise<Socket> {
    return await this.connectAsync({ port, host });
  }
  
  Socket.prototype.connectAsync = async function(path: string): Promise<Socket> {
    return await this.connectAsync({ path });
  }
  
  Socket.prototype.connectAsync = async function(options: ConnectOptions): Promise<Socket> {
    return new Promise<Socket>(resolve => {
      let socket = this.connect(options, () => {
        resolve(socket);
      });
    });
  }
  
  Socket.prototype.writeAsync = async function(data): Promise<boolean> {
    return await this.writeAsync(data, 'utf8');
  }
  
  Socket.prototype.writeAsync = async function(data, encoding): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let flushed = this.write(data, encoding, () => {
        resolve(flushed);
      });
    });
  }
  
  Socket.prototype.onceAsync = async function(): Promise<Buffer> {
    return new Promise<Buffer>(resolve => {
      this.once('data', (data) => {
        resolve(data);
      });
    });
  }
}