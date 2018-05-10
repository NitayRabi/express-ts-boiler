export interface IConnectionConfig  {
    protocol: string;
    host: string;
    port: number;
    defaultHeaders?: {[key: string]: string};
    password?: string;
}

export interface ISSLConfig {
    folder: string;
    key: string;
    cert: string;
    ca: string;
}

export interface IAPIConfig {
    prefix: string;
    version: string;
}

export interface IConfig {
    connection: IConnectionConfig;
    api: IAPIConfig;
    ssl: ISSLConfig;
}
