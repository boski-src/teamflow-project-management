import { getLogger, Configuration, Logger as Log, configure } from 'log4js';
import { readFileSync } from "fs";
import { safeLoad } from 'js-yaml';

export class Logger {

  constructor () {
    this.loadConfig();
  }

  public get console () : Log {
    return getLogger();
  }

  public get errors () : Log {
    return getLogger('errors');
  }

  public loadConfig () : void {
    try {
      let file = readFileSync(`${__dirname}/../../../config/logger.yaml`, {
        encoding: 'utf-8'
      });

      configure(<Configuration>safeLoad(file));
    }
    catch (e) {
      console.error('Logger config loading failed:', e.message);
      process.exit();
    }
  }

}

export const logger = new Logger();