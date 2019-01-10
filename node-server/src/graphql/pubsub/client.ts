import { RedisPubSub } from 'graphql-redis-subscriptions';

import { configLoader } from '../../base';

export const client = new RedisPubSub({
  connection: {
    host: configLoader.get('database.redis.hostname'),
    port: configLoader.get('database.redis.port'),
    password: configLoader.get('database.redis.password'),
    retry_strategy: 5000
  }
});