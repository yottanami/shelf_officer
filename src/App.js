import React from 'react';
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';
import Nav from './components/nav';
import Categories from './pages/categories/Categories';
import CreateCategory from './pages/categories/CreateCategory';
import EditCateogry from './pages/categories/EditCategory';
import Posts from './pages/posts/Posts';
import CreatePost from './pages/posts/CreatePost';
import EditPost from './pages/posts/EditPost';
import {Auth, Login} from './pages/auth/Login';
import RequestOTP from './pages/auth/RequestOTP';
import ConfirmOTP from './pages/auth/ConfirmOTP';
import cookie from 'react-cookies';

import {
  BrowserRouter,
  Router,
  Link,
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props)=>(
    typeof cookie.load('userToken') !== 'undefined'
      ? <Component {...props}/>
    : <Redirect to={{
      pathname: '/login/request',
      state: { from: props.location }
    }}/>
  )}/>
);

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <div>
        <Nav/>
        <PrivateRoute exact path='/' component={Categories} />
        <PrivateRoute exact path='/categories' component={Categories} />
        <PrivateRoute path='/categories/:id/edit' component={EditCateogry} />
        <PrivateRoute path='/categories/add' component={CreateCategory} />

        <PrivateRoute path='/posts/:categoryId' component={Posts} />
        <PrivateRoute path='/posts/:categoryId/edit/:id' component={EditPost} />
        <PrivateRoute path='/posts/:categoryId/add' component={CreatePost} />

        <Route path='/login/confirm' component={ConfirmOTP} />
        <Route path='/login/request' component={RequestOTP} />

      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
