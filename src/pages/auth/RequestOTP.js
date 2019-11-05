import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import {
  Redirect,
} from 'react-router-dom';
import cookie from 'react-cookies';

const REQUEST_OTP_MUTATION = gql`
mutation requestOtp($mobile: String!) {
  generateOtp(input: {mobile: $mobile, admin: true}) {
    result
  }
}
`;


export default class RequestOTP extends Component {
  constructor(props){
    super(props);
    // Does not work
    cookie.remove('userToken', {path: '/'});
    this.state = { mobile: '09---------' , redirect: null, test: ''};
    this.handleError = this.handleError.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleRequestOTP = this.handleRequestOTP.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render(){
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to = {{
        pathname: '/login/confirm',
        state: {mobile: this.state.mobile}
      }}
               />;
    }
    return(
      <Mutation
        mutation={REQUEST_OTP_MUTATION}
        variables= {{mobile: this.state.mobile}}
        onCompleted={data => this.handleRequestOTP(data)}
        onError    ={error => this.handleError(error)}
      >

        {(mutation, { data, error }) => (

          <div>
            <input
              onChange={this.handleInputChange}
              onFocus={this.handleFocus}
              value={this.state.mobile}
              maxLength={11}
            />

            <button
              onClick={()=>{

                mutation({
                  variables: {
                    mobile: this.state.mobile
                  }
                })
                  .then(res => res)
                  .catch(err => err);
              }}
            >
              Request
            </button>
          </div>
        )}

      </Mutation>
    );
  }

  handleInputChange(event){
    let re = /^09[0-9]*$/;
    if( re.test(event.target.value) ) {
      this.setState({mobile: event.target.value});
    }
    else {
      this.setState({mobile: "09"});
    }
  }

  handleError(result){
    alert('Request Error: ' + result);
  }

  handleFocus(){
    this.setState({mobile: '09'});
  }

  handleRequestOTP(result){
    if (result.generateOtp.result == 'Success'){
      //this.props.navigation.navigate('ConfirmOTP', {mobile: this.state.mobile});
      this.redirect();
    }else if (result.generateOtp.result == "Access Denied"){
      alert('اطلاعات وارد شده نادرست می‌باشد');
    }else{
      //      console.log(result.generateOtp);
      alert('خطایی در زمان ورود پیش آمد لطفا دقایقی صبر نمایید و مجدد تلاش فرمایید');
    }
  }

  async redirect(){
    this.setState({redirect: true});
  }
}
