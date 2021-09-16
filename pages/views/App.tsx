import React from "react"
import { Suspense } from "react"
import PostList from "./PostList";
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import RelayEnvironment from "pages/RelayEnvironment";
const App = () => {
  return <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Suspense fallback={'loading...'}><PostList /></Suspense>
  </RelayEnvironmentProvider>
}

export default App;