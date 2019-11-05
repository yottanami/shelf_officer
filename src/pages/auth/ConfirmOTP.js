import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import cookie from "react-cookies";
import {
  Redirect,
} from 'react-router-dom';

const CONFIRM_OTP_MUTATION = gql`
mutation confirmOtp($otp: String!, $mobile: String!) {
  confirmOtp(input: {otp: $otp, mobile:  $mobile, admin: true}) {
    accessToken
    errors
  }
}
`;

export default class ConfirmOTP extends Component {
  constructor(props){
    super(props);
    this.state = { otp: '----' };
    if ( typeof this.props.location.state !== 'undefined')
          if ( typeof this.props.location.state.mobile !== 'undefined')
            this.state = { otp: '----' , mobile: this.props.location.state.mobile };

    this.handleError = this.handleError.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleConfirmOTP = this.handleConfirmOTP.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render(){
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/' />;
     }

    if (typeof this.props.location.state === 'undefined'){
        return <Redirect to='/login/request' />;
    }

    return(
      <Mutation
        mutation = {CONFIRM_OTP_MUTATION}
        variables = {{otp: this.state.otp, mobile: this.state.mobile}}
        onCompleted = {data => this.handleConfirmOTP(data)}
        onError = {error => this.handleError(error)}
      >

        {(mutation, { data, error }) => (
          <div>
                <input
                  onChange={this.handleInputChange}
                  onFocus={this.handleFocus}
                  value={this.state.otp}
                  maxLength={4}
                />
            <button
              onClick={()=>{
                mutation({
                  variables: {
                    otp: this.state.otp
                  }
                })
                  .then(res => res)
                  .catch(err => err);
                //this.setState({otp: '----'});
              }}
            >
              تایید ورود
            </button>
          </div>
            )}

          </Mutation>
    );
  }

  handleInputChange(otp){
    let re = /^[0-9]*$/;
    if( re.test(otp.target.value) ) {
      this.setState({otp: otp.target.value});
    }
    else {
      this.setState({otp: ""});
    }
  }

  handleError(result){
    alert('Confirm Error: ' + result);
  }

  handleFocus(){
    this.setState({otp: ''});
  }

  handleConfirmOTP(result){
    if (typeof result.confirmOtp.accessToken !== 'undefined'){
      try {
        cookie.save('userToken', result.confirmOtp.accessToken, {path: '/'});
      } catch (error) {
        alert('خطایی در زمان ذخیره‌سازی پیش آمد');
      } finally {
        this.setState({redirect: true});
      }
    }else{
      alert('خطایی در زمان ورود پیش آمد لطفا از صحت کد وارد شده مطمئن شوید');
    }
  }
}
