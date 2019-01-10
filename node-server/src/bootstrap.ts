// import * as os from 'os';
// import * as cluster from 'cluster';

import { configLoader, IConnectConfig, logger, mongoConnect } from './base';

import { rest } from './rest';
import { graphql } from './graphql';

export module boot {
  // export async function workers (fn : Function, childs? : number) : Promise<any[]> {
  //   let workers = [];
  //
  //   if (process.env.NODE_ENV === 'production') {
  //     if (cluster.isMaster) {
  //       logger.console.debug('Master worker started: %i', process.pid);
  //       let cpus : number = childs ? childs : os.cpus().length;
  //       for (let i = 0; i < cpus; i++) await workers.push(cluster.fork());
  //     } else await fn();
  //   } else await fn();
  //
  //   return workers;
  // }

  export function exit (error : Error) : void {
    logger.errors.error(error.message);
    process.exit();
  }
}

export async function bootstrap (port : number, childs? : number) : Promise<number> {
  // await boot.workers(async () => {
  //   await mongoConnect(<IConnectConfig>configLoader.get('database.mongo'));
  //   await graphql.run();
  //   await rest.run(port);
  // }, childs)
  //   .catch(e => boot.exit(e));

  try {
    await mongoConnect(<IConnectConfig>configLoader.get('database.mongo'));
    await graphql.run();
    await rest.run(port);
  }
  catch (e) {
    boot.exit(e);
  }

  return port;
}

process.on('SIGINT', () => {
  rest.server.close();
  process.exit();
});

for (const event of <any[]>['uncaughtException', 'unhandledRejection'])
  process.on(event, e => logger.errors.error(e));

// cluster.on('error', (worker, err) : void => {
//   logger.errors.error('Worker %i error:', err);
// });