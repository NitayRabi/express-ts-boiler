import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Application, Response, NextFunction, Request } from 'express';
import * as compression from 'compression';
import * as https from "https";
import * as http from "http";
//
import * as path from "path";
import { configService } from './services';
import { IRouter, getSslCerts, ISSLConfig } from './models/';
import { responseHandler } from './services/rest';

export class App {

    express: Application;
    config = configService.config;

    constructor(private routers: IRouter[]) {
        try {
            this.express = express();
            this.middleware();
            this.routes();
            this.initHandlers();
            this.listen();
        } catch (err) {
            this.onError(err);
        }
    }

    private middleware(): void {
        this.express.use(compression());
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
            next();
        });
        this.express.use(bodyParser.json({ limit: '50mb' }));
        this.express.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    }

    routes(): void {
        for (const router of this.routers) {
            const fullPrefix = `/${this.config.api.prefix}/${this.config.api.version}/${router.prefix}`;
            this.express.use(fullPrefix, router.router);
        }
    }

    private initHandlers(){
        /**
         * Generic handler (final layer - get's next()'s item and handles errors/responses)
         */
        this.express.use(responseHandler.genericResponseHandler);
        /**
         * 404 Handler
         */
        this.express.use(responseHandler.notFoundHandler);
    }

    listen() {
        if (this.config.connection.protocol === 'https') {
            const certs = getSslCerts(this.sslConfig.key,
                this.sslConfig.cert,
                this.sslConfig.ca);
            const httpsServer = https.createServer(certs, this.express);
            httpsServer.listen(this.config.connection.port);
            httpsServer.on('error', this.onError);
            httpsServer.on('listening', this.onListening);
        } else {
            const httpServer = http.createServer(this.express);
            httpServer.listen(this.config.connection.port);
            httpServer.on('error', this.onError);
            httpServer.on('listening', this.onListening);
        }
    }

    get sslConfig(): Partial<ISSLConfig> {
        return {
            cert: this.joinSSLFolder(this.config.ssl.cert),
            ca: this.joinSSLFolder(this.config.ssl.ca),
            key: this.joinSSLFolder(this.config.ssl.key),
        }
    }

    /**
     * Event listener for HTTP server 'error' event.
     */
    private onError = (error) => {
        console.log(`Error starting application: ${error}`);
    }

    /**
     * Event listener for HTTP/S server 'listening' event.
     */
    private onListening = () => {
        console.log(`API running on port: ${this.config.connection.port}`);
    }

    private joinSSLFolder(certPath: string): string {
        return path.join(this.config.ssl.folder, certPath);
    }

}
