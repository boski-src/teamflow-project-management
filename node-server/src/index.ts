import { configLoader, logger } from './base';

import { bootstrap } from './bootstrap';

bootstrap(process.env.PORT || configLoader.get('environment.port'))
  .then(port => {
    logger.console.info('App started (worker: %i) on port: %i', process.pid, port);
  });