import React from 'react';
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';

import Categories from './pages/Categories';
import CreateCategory from './pages/CreateCategory';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <CreateCategory/>
<hr />
        <Categories />
  </ApolloProvider>
);

export default App;
