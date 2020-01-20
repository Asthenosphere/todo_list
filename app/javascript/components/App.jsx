import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
import Root from "../components/Root";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import TaskNew from "../components/TaskNew";
import TaskEdit from "../components/TaskEdit";
import Users from "./Users";
import User from "./User"
import Categories from "./Categories";
import Category from "./Category";
import CategoryNew from "./CategoryNew";
import CategoryEdit from "./CategoryEdit";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios.get("https://asthenosphere-todo-list.herokuapp.com/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })
      .catch(error => {
        console.log("login errors", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={props => (
                <Root
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  username={this.state.user.username}
                  admin={this.state.user.admin}
                />
              )}
            />
            <Route
              exact path="/tasks"
              render={props => (
                <Tasks
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  admin={this.state.user.admin}
                />
              )}
            />
            <Route
              exact path="/task/:id"
              render={props => (
                <Task
                  {...props}
                  admin={this.state.user.admin}
                />
              )}
            />
            <Route exact path="/new_task" render={props => (
              <TaskNew
                {...props}
                admin={this.state.user.admin}
              />
              )} />
            <Route exact path="/task/:id/edit" render={props => (
              <TaskEdit
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/users" render={props => (
              <Users
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/user/:id" render={props => (
              <User
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/categories" render={props => (
              <Categories
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/category/:id" render={props => (
              <Category
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/new_category" render={props => (
              <CategoryNew
                {...props}
                admin={this.state.user.admin}
              />
            )} />
            <Route exact path="/category/:id/update" render={props => (
              <CategoryEdit
                {...props}
                admin={this.state.user.admin}
              />
            )} />
          </Switch>
        </Router>
      </div>
    )
  }
}

