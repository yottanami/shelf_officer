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
import {fakeAuth, Login} from './pages/auth/Login';

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
    fakeAuth.isAuthenticated === true
    ? <Component {...props}/>
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }}/>
  )}/>
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true
  ? <p>
    Welcome! <button onClick={()=> {
      fakeAuth.signout(()=> history.push('/'))
    }}>Sign Out</button>
  </p>
  : <p>You are not logged in.</p>
))

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <div>
        <Nav/>
        <AuthButton />
        <PrivateRoute exact path='/' component={Categories} />
        <PrivateRoute path='/categories' component={Categories} />
        <PrivateRoute path='/categories/:id/edit' component={EditCateogry} />
        <PrivateRoute path='/categories/add' component={CreateCategory} />

        <PrivateRoute path='/posts/:categoryId' component={Posts} />
        <PrivateRoute path='/posts/:categoryId/edit/:id' component={EditPost} />
        <PrivateRoute path='/posts/:categoryId/add' component={CreatePost} />

        <Route path='/login' component={Login} />

      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
