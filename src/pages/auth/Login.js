import React, { Component } from 'react';
import {
  Redirect,
  withRouter
} from 'react-router-dom';
//import {fakeAuth} from '../../Auth';
//import App from '../App';

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb){
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb){
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export class Login extends Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(()=> {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/'} }

    if (redirectToReferrer === true){
      return(
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view this page at {from.pathname}</p>
        <button onClick={this.login}>Log In</button>
      </div>
    )
  }
}
