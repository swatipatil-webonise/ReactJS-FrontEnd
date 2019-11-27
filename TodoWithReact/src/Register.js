import React from 'react';
import RequestService from './RequestService';
import { url } from './url';

const Email_Format = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export default class Register extends React.Component {

  validateFields = () => {
    let render = true;
    if (this.refs.firstnameRef.value === '' || this.refs.usernameRef.value === '' || this.refs.passwordRef.value === '' || this.refs.emailRef.value === '') {
      alert('Please fill all the fields.');
      render = false;
    } else if (!Email_Format.test(this.refs.emailRef.value)) {
      alert('Please enter correct email id.');
      this.refs.emailRef.value = ''
      render = false;
    }
    if (render) {
      this.registerUser();
    }
  }

  registerUser = () => {
    RequestService.save(`${url}/register`, {
      name: this.refs.firstnameRef.value,
      username: this.refs.usernameRef.value,
      password: this.refs.passwordRef.value,
      email: this.refs.emailRef.value
    })
    .then((response) => {
      if (response.status === 200) {
        alert('You registered successfully.')
        this.props.history.push('/');
      }
    }).catch((err) => {
      if(err.message === 'Network Error') {
        alert ('Server not available plz try after some time....');
        this.refs.usernameRef.value = this.refs.passwordRef.value = '';
      } else if (err.response.status === 409) {
        alert(err.response.data);
         this.refs.usernameRef.value = '';
      } else {
        alert(err.response.data);
        this.refs.emailRef.value = '';
      }
    })
  }

  render() {
    return (
      <form>
        <center><br></br>
          <h1>Register yourself here.......</h1><br></br>
          <table>
            <tr><td>First Name : </td><td><input type="text" ref="firstnameRef" /></td></tr>
            <tr><td>Username : </td><td><input type="text" ref="usernameRef" /></td></tr>
            <tr><td>Password : </td><td><input type="password" ref="passwordRef" /></td></tr>
            <tr><td>Email : </td><td><input type="email" ref="emailRef" /></td></tr>
          </table>
          <input type="button" value="Register" onClick={this.validateFields.bind(this)}></input><br /><br /><br />
        </center>
      </form>
    );
  }
}
