import React from 'react';
import { connect } from 'react-redux';
import { getTodo, registerUser } from './store/actions/todo';
const VALIDEMAILREGEX = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const NAME_FORMAT = /^[a-zA-Z]+$/;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      username: '',
      password: '',
      email: '',
    }
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

  initFirstname = (event) => {
    this.setState({
      firstname: event.target.value,
    });
  }

  initEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  componentDidMount() {
    this.props.getTodo();
  }

  registerMe = () => {
    if (this.state.firstname === '' || this.state.username === '' || this.state.password === '' || this.state.email === '') {
      alert("Please fill all the details...");
        return false;
      }
      if (NAME_FORMAT.test(this.state.firstname) === false) {
        alert("Please enter proper name...");
        this.setState({
          firstname: '',
        })
          return false;
      }
      if (this.state.password.length < 8) {
        alert("Your password is too short ...");
        this.setState({
          password: '',
        })
        return false;
      }
      if (VALIDEMAILREGEX.test(this.state.email) === false) {
        alert("Email you entered is not valid..");
        this.setState({
          email: '',
        })
        return false;
      }
      else {
        let user = {
        name: this.state.firstname,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }
      this.props.registerUser(user);
    }
  }

  render() {
    return (
      <div>
        <center><br></br>
          <h1>Register yourself here.......</h1><br></br>
          <table>
            <tr><td>First Name : </td><td><input type="text" value={this.state.firstname} onChange={this.initFirstname} required /></td></tr>
            <tr><td>Username : </td><td><input type="text" value={this.state.username} onChange={this.initUsername} required="required" /></td></tr>
            <tr><td>Password : </td><td><input type="password" value={this.state.password} onChange={this.initPassword} required="required" /></td></tr>
            <tr><td>Email : </td><td><input type="email" value={this.state.email} onChange={this.initEmail} required="required" /></td></tr>
          </table>
          <input type="button" value="Register" onClick={this.registerMe.bind(this)}></input><br /><br /><br />
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoData: state.todos,
});

const mapDispatchToProps = dispatch => ({
  getTodo: () => dispatch(getTodo()),
  registerUser: (user) => dispatch(registerUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register); 
