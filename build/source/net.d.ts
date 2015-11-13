import * as net from 'net';
export declare type Socket = net.Socket;
export declare module AsyncNet {
    function connectAsync(port: any, host: any): Promise<Socket>;
}
