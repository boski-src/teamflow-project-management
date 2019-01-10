import { connect, Mongoose } from 'mongoose';

import { IConnectConfig } from './common/interfaces';

export async function mongoConnect (config : IConnectConfig) : Promise<Mongoose> {
  let { username, password, hostname, port, database } = config;
  let uri = `mongodb://${username}:${password}@${hostname}:${port}/${database}`;

  return await connect(uri, { useNewUrlParser: true });
}