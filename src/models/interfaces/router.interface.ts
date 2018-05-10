import { Router } from 'express';

export interface IRouter {

    router: Router;
    /**
     * Prefix will be used under main application path (api/VERSION/PREFIX/...)
     */
    prefix: string;
    initMiddlewares(): void;
    initRoutes(): void;
}