import React from 'react';
import history from './history';
import { Link } from 'react-router-dom'
import Register from './Register';

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
    return fetch('http://localhost:8080/authenticate', {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.refs.usernameRef.value, password: this.refs.passwordRef.value })
    })
    .then(response => response.json())
    .then(json => {alert(json);
    }).catch((err) => {
      console.log(err);
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
