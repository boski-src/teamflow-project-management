import { GraphQLID, GraphQLString } from 'graphql';
import { ObjectType, Query, Resolver } from 'graphql-express-server-decorators';

import { isAuth } from '../../graphql.guards';

@Resolver([isAuth])
export class AccountResolver {

  @Query()
  @ObjectType('AccountType', {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
  public getAccount (root, args, ctx) : AsyncIterator<any> {
    return ctx.account;
  }

}