import { Request, Response, NextFunction } from 'express';
//
import { ForbiddenError } from '../../models/classes/errors.class';

export class GenericResponse<T> {
    success: boolean;
    constructor(public body: T) {
        this.success = !(body instanceof Error);
        if (process.env.NODE_ENV === 'production' && body.hasOwnProperty && body.hasOwnProperty('stack')) {
            delete this.body['stack'];
        }
    }
}

export class ResponseHandler {

    constructor() {
        // This handles stringing errors
        if (!('toJSON' in Error.prototype)) {
            Object.defineProperty(Error.prototype, 'toJSON', {
                value: function () {
                    const alt = {};
                    Object.getOwnPropertyNames(this).forEach( (key) => {
                        alt[key] = this[key];
                    }, this);
                    return alt;
                },
                configurable: true,
                writable: true
            });
        }
    }

    genericResponseHandler = (data: any, req: Request, res: Response, next: NextFunction): Response => {
        if (!data) {
            return res.status(204).json(new GenericResponse('Empty response'));
        }
        let status = 200;
        if (data instanceof Error) {
            status = this.getErrorCode(data);
        }
        return res.status(status).json(new GenericResponse(data));
    };

    notFoundHandler = (req: Request, res: Response, next: NextFunction): Response => {
        return res.status(404).json(new GenericResponse(new Error('Not found')));
    };

    private getErrorCode(err: Error): number {
        switch (true) {
            case err instanceof ForbiddenError:
                return 403;
            default:
                return 500;
        }
    }
}

/**
 * Export singleton
 * @type {ResponseHandler}
 */
export const responseHandler = new ResponseHandler();