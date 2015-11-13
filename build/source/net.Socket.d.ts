import * as net from 'net';
export interface BaseConnectionOptions {
    port: number;
    host?: string;
    localAddress?: string;
    localPort?: number;
    family?: number;
}
export interface ServerConnectionOptions extends BaseConnectionOptions {
    allowHalfOpen?: boolean;
}
export interface SocketConnectionOptions extends BaseConnectionOptions {
    lookup?: any;
}
export interface UnixDomainConnectionOptions extends BaseConnectionOptions {
    path?: string;
}
export interface ISocketAsync {
    connectAsync(path: string): Promise<net.Socket>;
    connectAsync(port: number, host: string): Promise<net.Socket>;
    connectAsync(options: SocketConnectionOptions): Promise<net.Socket>;
    writeAsync(data: any): Promise<boolean>;
    writeAsync(data: any, encoding: any): Promise<boolean>;
    onceAsync(): Promise<Buffer>;
}
export interface Socket extends ISocketAsync {
}
