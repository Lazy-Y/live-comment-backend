// your-app-name/src/RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

interface Props {
  params: { name: any; text: string };
  variables: any;
}
// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay({ params, variables }: Props) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL({ text: params.text, variables });
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create((params, variables) => fetchRelay({ params, variables })),
  store: new Store(new RecordSource()),
});
