import React from 'react';
import history from './history';
import { Link } from 'react-router-dom'
import Register from './Register';
import RequestService from './RequestService';
export class Login extends React.Component {
  
  validateFields = () => {
    let render = true;
    if(this.refs.usernameRef.value === '' || this.refs.passwordRef.value === '') {
      alert("Please fill all the fields.");
      render = false;
    } 
    if (render) {
      this.isValidUser();
    }
  }

  isValidUser = () => {
    RequestService.save('http://localhost:8080/login', { username: this.refs.usernameRef.value, password: this.refs.passwordRef.value })
    .then((response) => {
      if (response.status === 200) {
        if (response.data) { 
          history.push('/view');
          window.location.reload()
        } else {
          alert("Sorry you entered wrong password.");
          this.refs.passwordRef.value = '';
        }
      }
    }).catch((err) => {
      if (err.response.status === 404) {
        alert ("You need to register yourself first.");
        this.refs.usernameRef.value = this.refs.passwordRef.value = '';
      }
    })
  }

  render() {
    return (
      <center>
        <form>
          <br /><br /><br /><h1>Enter your credentials ....</h1><br />
          Username : <input type="text" ref="usernameRef" /><br /><br />
          Password : <input type="password" ref="passwordRef"  /><br /><br />
          <input type="button" value="Login" onClick={this.validateFields.bind()}></input><br /><br /><br />
          <Link to="/register" Component={Register}>register here!</Link>
        </form>
      </center>
    );
  }
}
