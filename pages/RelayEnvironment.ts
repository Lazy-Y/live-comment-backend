// your-app-name/src/RelayEnvironment.js
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  SubscribeFunction,
  Variables,
} from 'relay-runtime';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import fetchGraphQL from './fetchGraphQL';

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  return fetchGraphQL(params.text, variables);
}

// const subscriptionClient = new SubscriptionClient('ws://localhost:3000/graphql', {
//   reconnect: true,
// });

// const subscribe: SubscribeFunction = (request: RequestParameters, variables: Variables) => {
//   const subscribeObservable = subscriptionClient.request({
//     query: request.text ?? undefined,
//     operationName: request.name,
//     variables,
//   });
//   // Important: Convert subscriptions-transport-ws observable type to Relay's
//   return Observable.from(subscribeObservable as any);
// };
// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(
    fetchRelay,
    // subscribe
  ),
  store: new Store(new RecordSource()),
});
