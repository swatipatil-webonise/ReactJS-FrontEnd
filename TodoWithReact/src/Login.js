import React from 'react';
import { Link } from 'react-router-dom'
import Register from './Register';
import RequestService from './RequestService';
import { url } from './url';

export class Login extends React.Component {

  validateFields = () => {
    let render = true;
    if (this.refs.usernameRef.value === '' || this.refs.passwordRef.value === '') {
      alert('Please fill all the fields.');
      render = false;
    }
    if (render) {
      this.isValidUser();
    }
  }

  isValidUser = () => {
    RequestService.save(`${url}/authenticate`,
      { username: this.refs.usernameRef.value, password: this.refs.passwordRef.value })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt);
        this.props.history.push('/view');
      }
    }).catch((err) => {
      if (err.response.status === 404) {
        alert('Sorry you need to register yourself first.');
        this.refs.usernameRef.value = this.refs.passwordRef.value = '' ;
      } else {
        alert('Sorry you entered incorrect password.');
        this.refs.passwordRef.value = '';
      }
    })
  }
  
  render() {
      return(
      <center>
    <form>
      <br /><br /><br /><h1>Enter your credentials ....</h1><br />
      Username : <input type="text" ref="usernameRef" /><br /><br />
      Password : <input type="password" ref="passwordRef" /><br /><br />
      <input type="button" value="Login" onClick={this.validateFields.bind()}></input><br /><br /><br />
      <Link to="/register" Component={Register}>register here!</Link>
    </form>
      </center >
    );
  }
}
