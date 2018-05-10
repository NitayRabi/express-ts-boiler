import { Router } from 'express';
//
import { IRouter } from '../models';
import { sampleController, SampleController } from '../controllers';

export class SampleRouter implements IRouter {

    router: Router;
    prefix = 'sample';

    constructor(private sampleController: SampleController) {
        this.router = Router();
        this.initMiddlewares();
        this.initRoutes();
    }

    initMiddlewares(): void {
        /**
         * Init router level middlewares
         */
    }

    initRoutes(): void {
        /**
         * We map the paths for the different APIs to correct methods and control functions
         */
        this.router.route('/')
            .get(this.sampleController.sampleControlFunction);
    }
}

/**
 * Export singleton.
 * @type {SampleRouter}
 */
export const sampleRouter = new SampleRouter(sampleController);