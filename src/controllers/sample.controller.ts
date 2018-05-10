import {Response, Request, NextFunction} from 'express';
import { configService, ConfigService } from '../services/general';

export class SampleController {

    /**
     * Inject this controller with different services.
     */
    constructor(private configService: ConfigService){}

    /**
     * Control functions control requests, responses and passing data to the next layers (handler layers)
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    sampleControlFunction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = 'Hello World';
            // Perform some async functionality such as db fetching, proxy and more, and move to the next layer (handler).
            next(data);
        } catch (err) {
            // Catch err and move to next layere.
            next(err);
        }
    };
}

/**
 * Export singleton controller
 * Inject the instances of services here.
 */
export const sampleController = new SampleController(configService);