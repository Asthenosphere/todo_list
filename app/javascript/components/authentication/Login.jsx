import React from 'react';
import axios from 'axios';
import user from './person-fill.svg'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    axios.post("http://localhost:3000/sessions", {
        user: {
          email: email,
          password: password,
        }
      },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === 401) {
          window.alert("There was something wrong with your credentials.");
          return;
        }
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuthentication(response.data)
        }
      })
      .catch(error => {
        console.log("login error", error)
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h5 className="center">Already have an account?</h5><br/>
        <div className="center">
          <img src={user} height={"32"} width={"32"}/>
        </div>
        <h2 className="center">Log in</h2><br/>
        <form className="ui form" onSubmit={this.handleSubmit}>
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
          </div><br/>
          <div className="center">
            <button className="ui basic orange button" type="submit">Log in</button>
          </div>
        </form>
      </div>
    )
  }
}