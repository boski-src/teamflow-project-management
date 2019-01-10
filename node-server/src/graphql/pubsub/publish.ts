import { publish as _publish } from 'graphql-express-server-decorators';

import { client } from './client';

export async function publish (name : string, data : any) : Promise<void> {
  await _publish(name, data, client);
}