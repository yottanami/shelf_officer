import React from 'react';
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';



import Categories from './pages/Categories';
import CreateCategory from './pages/CreateCategory';
import EditCateogry from './pages/EditCategory';

const App = () => (
  <ApolloProvider client={apolloClient}>
  <Router>
    <div>
      <Route exact path='/' component={Categories} />
      <Route path='/categories' component={Categories} />
      <Route path='/categories/edit/:id' component={EditCateogry} />
      <Route path='/categories/add' component={CreateCategory} />
    </div>
  </Router>
  </ApolloProvider>
);

export default App;
