import React from 'react';
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/nav';

import Categories from './pages/categories/Categories';
import CreateCategory from './pages/categories/CreateCategory';
import EditCateogry from './pages/categories/EditCategory';

import Posts from './pages/posts/Posts';
import CreatePost from './pages/posts/CreatePost';
import EditPost from './pages/posts/EditPost';

const App = () => (
  <ApolloProvider client={apolloClient}>
  <Router>
    <div>
      <Nav/>
      <Route exact path='/' component={Categories} />
      <Route path='/categories' component={Categories} />
      <Route path='/categories/:id/edit' component={EditCateogry} />
      <Route path='/categories/add' component={CreateCategory} />

      <Route path='/posts/:categoryId' component={Posts} />
      <Route path='/posts/:categoryId/edit/:id' component={EditPost} />
      <Route path='/posts/:categoryId/add' component={CreatePost} />

    </div>
  </Router>
  </ApolloProvider>
);

export default App;
