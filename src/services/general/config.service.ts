import * as config from 'config';
//
import { IConfig } from '../../models/';

export class ConfigService {

    config = <IConfig>config.get('config');

}

/**
 * Export singleton to be injected to other services.
 */
export const configService = new ConfigService();