import { Suspense } from "react"
import PostList from "./PostList";
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import RelayEnvironment from "pages/RelayEnvironment";
import TestRelayFetch from "./TestRelayFetch";
const App = () => {
  console.log('load APP');

  return <div>
    {/* <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'loading...'}><PostList /></Suspense>
      <div>hello</div>
    </RelayEnvironmentProvider> */}
    <TestRelayFetch />
    <div>world</div>
  </div>
}

export default App;