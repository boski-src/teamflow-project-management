import { IConfig } from 'graphql-express-server-decorators';

import { AccountResolver, ChatResolver, EventResolver, ProjectResolver, TaskResolver, TeamResolver } from './resolvers';

export const GraphQLConfig : IConfig = {
  endpoint: '/graphql',
  subsEndpoint: '/subscriptions',
  console: true,
  middlewares: [],
  resolvers: [
    AccountResolver,
    TeamResolver,
    ChatResolver,
    ProjectResolver,
    TaskResolver,
    EventResolver
  ]
};