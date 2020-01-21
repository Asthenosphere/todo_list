import React from 'react';
import axios from 'axios';
import user from './person.svg'

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { username, email, password, password_confirmation } = this.state;
    axios.post("https://asthenosphere-todo-list.herokuapp.com/registrations", {
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuthentication(response.data)
        }
      })
      .catch(error => {
        console.log("registration error", error);
        if (password !== password_confirmation) {
          window.alert("Your password and password confirmation do not match.");
        } else {
          window.alert("Either your Username or Email has been taken.");
        }
      });
    event.preventDefault();
  }

  handleChange(event) {
    console.log("handle change", event);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderForm = () => {
    return (
      <div>
        <h5 className="center">New to To-do List?</h5><br/>
        <div className="center">
          <img src={user} width={"32"} height={"32"}/>
        </div>
        <h2 className="center">Sign up</h2><br/>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Re-enter Password"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </div><br/>
          <div className="center">
            <button className="ui basic blue button" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    )
  };

  render() {
    return (
      <>
        {this.renderForm()}
      </>
    )
  }
}