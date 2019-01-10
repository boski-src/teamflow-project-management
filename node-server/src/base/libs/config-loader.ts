import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

import { IAppConfig, EAppConfigs } from '../../common';

import { logger } from './logger';

export class ConfigLoader {

  private static dir : string = `${__dirname}/../../../config`;

  public config : IAppConfig = {} as IAppConfig;

  constructor () {
    this.loadAll(process.env.NODE_ENV === 'production');
  }

  private loadAll (prod : boolean = false) {
    this.loadConfig(EAppConfigs.app);
    this.loadConfig(EAppConfigs.db);
    this.loadConfig(EAppConfigs.env);
    logger.console.debug(`Loaded ${prod ? 'PRODUCTION' : 'DEVELOPMENT'} config.`);
  }

  private loadConfig (config : EAppConfigs) {
    try {
      let file = this.loadConfigFile(config);
      this.config[config] = safeLoad(file);
    }
    catch (e) {
      logger.errors.error('Config loading failed:', e.message);
      process.exit();
    }
  }

  public get (keyString : string) : any {
    try {
      if (!keyString) return this.config;

      let cfg : IAppConfig = this.config;
      let keys : string[] = keyString.split('.');
      for (let i = 0; i < keys.length; i++) cfg = cfg[keys[i]];

      return cfg ? cfg : false;
    }
    catch (e) {
      return false;
    }
  }

  public loadConfigFile (file : string) : string {
    let prod = process.env.NODE_ENV === 'production';
    return this.readFile(prod ? `prod.${file}.yaml` : `dev.${file}.yaml`);
  }

  public readFile (file : string) : string {
    return readFileSync(`${ConfigLoader.dir}/${file}`, 'utf8');
  }

}

export const configLoader = new ConfigLoader();