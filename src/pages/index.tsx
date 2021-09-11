import React from 'react';
import { NextPage } from 'next';
import App from './App';
import RelayEnvironment from 'src/client/RelayEnvironment';

import {
    RelayEnvironmentProvider,
} from 'react-relay/hooks';

const Home: NextPage = () => {
    return <RelayEnvironmentProvider environment={RelayEnvironment}>
        <App />
    </RelayEnvironmentProvider>;
};

export default Home;
