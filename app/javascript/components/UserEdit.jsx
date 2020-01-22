import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Washington.png";
import Navigation from "./Navigation";
import axios from "axios";

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v2/show/${id}`;
    const _this = this;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      }).then(function(data) {
        _this.setState({
          username: data.username,
          email: data.email
        })
      }
    );
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;

    const url = "https://asthenosphere-todo-list.herokuapp.com/api/v2/update/" + id.toString();
    axios.post(url, {
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      },
      { withCredentials: true })
      .then(response => {
        if (response.data.status === 500) {
          if (password_confirmation !== password) {
            window.alert("Password does not match with password confirmation.");
          } else {
            window.alert("Either the username or email address has been taken.");
          }
        } else if (response.data.status === "updated") {
          this.props.history.push(`/user/${id}`);
        }
      })
      .catch(error => {
        console.log("user update error", error);
        if (password !== password_confirmation) {
          window.alert("Your password and password confirmation do not match.");
        } else {
          window.alert("Either your Username or Email has been taken.");
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navigation admin={this.props.admin} active={"task_edit"} current={this.props.current} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"474"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">Update Profile</h1>
            <h4>Update your credentials</h4>
          </div>
        </section>
        <div className="ui grid">
          <div className="ui five wide column"/>
          <div className="ui six wide column">
            <div className="ui center aligned segment">
              <form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={this.state.username}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={this.state.email}
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="field">
                  <label>Password Confirmation</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Re-enter Password"
                    onChange={this.onChange}
                    className="form-control"
                    required
                  />
                </div><br/>
                <div className="center">
                  <button className="ui basic blue button" type="submit">Update Profile</button>
                  <Link to={"/user/" + this.props.current} className="ui basic teal button">Back to Profile</Link>
                </div>
              </form>
            </div>
          </div>
        </div><br/><br/><br/>
        <Footer />
      </div>
    );
  }
}