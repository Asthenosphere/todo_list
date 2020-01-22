import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Registration from "./authentication/Registration";
import Login from "./authentication/Login";
import Footer from "./Footer";
import Navigation from "./Navigation";


export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuthentication = this.handleSuccessfulAuthentication.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuthentication(data) {
    this.props.handleLogin(data);
    this.props.history.push("/tasks")
  }

  handleLogoutClick() {
    axios.delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      }).catch(error => {
        console.log("log out errors", error)
    })
  }

  render() {
    return (
      <div>
        {this.props.loggedInStatus === "LOGGED_IN" ?
          <Navigation admin={this.props.admin} active={"home"} current={this.props.current} />
          :
          undefined
        }
        <br/><br/><br/><br/>
        <div className="jumbotron jumbotron-fluid bg-white">
          <h1 className="center display-4">Welcome to To-do List</h1>
          <p className="center">
            An elegant, simple yet powerful way to manage your tasks
          </p>

          <hr className="center" />
          {this.props.loggedInStatus === "LOGGED_IN" ?
            <div>
              <div className="container"><br/>
                {this.props.admin ?
                  <div className="center ui teal message">Welcome, {this.props.username} (Admin)</div>
                  :
                  <div className="center ui teal message">Welcome, {this.props.username}</div>
                }
              </div><br/><br/>
              <div className="center">
                <Link
                  to="/tasks"
                  className="ui basic blue button"
                  role="button"
                >
                  View Tasks
                </Link>
                <Link
                  to="/categories"
                  className="ui basic grey button"
                  role="button"
                >
                  View Categories
                </Link>
                <button className={"ui basic red button"} onClick={() => this.handleLogoutClick()}>Log out</button>
              </div>
            </div>
            :
            <div className="container">
              <br/>
              <div className="center ui yellow message">You need to be logged in to continue</div>
            </div>
          }
        </div>
        {this.props.loggedInStatus === "LOGGED_IN" ?
          undefined
          :
          <div className="container">

            <div className="ui transparent segment">
              <div className="ui stackable very relaxed two column grid">
                <div className="column">
                  <Login handleSuccessfulAuthentication={this.handleSuccessfulAuthentication}/>
                </div>
                <div className="middle aligned column">

                  <Registration handleSuccessfulAuthentication={this.handleSuccessfulAuthentication}/>
                </div>
              </div>
              <div className="ui vertical divider">Or</div>
            </div>
          </div>
        }
        <br/><br/><br/><br/>
        {this.props.loggedInStatus === "LOGGED_IN" ?
          <div><br/><br/><br/><br/>
            <Footer/>
          </div>
          :
          <Footer/>
        }
      </div>
    )
  }
};