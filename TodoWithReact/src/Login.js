import React from 'react';
import axios from 'axios';
import history from './history';
import { Link } from 'react-router-dom'
import Register from './Register';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  isValid = (event) => {
    if (this.state.username === '' || this.state.password === '') {
      event.preventDefault();
      alert('Please fill all the credentials..');
      return false;
    }
    axios({
      method: 'get',
      url: `http://localhost:8080/todos/getUserByUsername/${this.state.username}`
    }).then((response) => {
      if (JSON.stringify(response.data) === "\"\"") {
        alert("Sorry You need to register first ....");
        history.push('/');
        window.location.reload()
      } else {
        history.push('/view');
        window.location.reload()
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  initUsername = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  initPassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    return (
      <center><br /><br /><br /><h1>Enter your credentials ....</h1><br />
        Username : <input type="text" value={this.state.username} onChange={this.initUsername} /><br /><br />
        Password : <input type="password" value={this.state.password} onChange={this.initPassword} /><br /><br />
        <input type="button" value="Login" onClick={this.isValid.bind(this)}></input><br /><br /><br />
        <Link to="/register" Component={Register}>register here!</Link>
      </center>
    );
  }
}
