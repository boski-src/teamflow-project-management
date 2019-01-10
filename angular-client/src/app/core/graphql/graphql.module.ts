import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink, HttpLinkHandler, HttpLinkModule } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { environment as env } from '../../../environments/environment';
import { SessionService, TokenService } from '../services';

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [Apollo]
})
export class GraphQLModule {

  public wsClient : SubscriptionClient;

  constructor (
    private apollo : Apollo,
    private httpLink : HttpLink,
    private tokenService : TokenService,
    private sessionService : SessionService
  ) {
    this.sessionService.isLogged$.subscribe((value) => {
      if (this.wsClient) {
        this.wsClient.close(true);
        // @ts-ignore
        if (value) this.wsClient.connect();
      } else {
        this.init();
      }
    });
  }

  public init () {
    this.apollo.create({
      link: this.setupMiddlewares().concat(this.link),
      cache: new InMemoryCache()
    });
  }

  private get link () : ApolloLink {
    return ApolloLink.split(
      ({ query, operationName }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      this.socket,
      this.http
    );
  }

  private get http () : HttpLinkHandler {
    let pcl = env.graphql.ssl ? 'https' : 'http';

    return this.httpLink.create({
      uri: `${pcl}://${env.graphql.host}${env.graphql.httpEndpoint}`
    });
  }

  private get socket () : WebSocketLink {
    let pcl = env.graphql.ssl ? 'wss' : 'ws';

    const token = () => this.tokenService.get();

    this.wsClient = new SubscriptionClient(
      `${pcl}://${env.graphql.host}${env.graphql.wsEndpoint}`, {
        reconnect: true,
        timeout: 20000,
        connectionParams: () => ({
          Authorization: `Bearer ${token()}`
        })
      }
    );

    this.wsClient.use([
      {
        applyMiddleware (opts, next) {
          opts['Authorization'] = `Bearer ${token()}`;
          next();
        }
      }
    ]);

    return new WebSocketLink(this.wsClient);
  }

  private setupMiddlewares () : ApolloLink {
    const err = onError((error) => {
      let { networkError, graphQLErrors, response, operation } = error;
      if (networkError) this.sessionService.destroy();
    });
    const req = setContext(() => {
      if (this.tokenService.get()) {
        return {
          headers: new HttpHeaders().append('Authorization', this.tokenService.get())
        };
      }
    });
    return from([err, req]);
  }

}
