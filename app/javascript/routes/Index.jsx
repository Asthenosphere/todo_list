import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "../components/Root";
import Tasks from "../components/Tasks";
import Task from "../components/Task";
import TaskNew from "../components/TaskNew";
import TaskEdit from "../components/TaskEdit";
import Users from "../components/Users";
import User from "../components/User";
import Categories from "../components/Categories";
import Category from "../components/Category";
import CategoryNew from "../components/CategoryNew";
import CategoryEdit from "../components/CategoryEdit";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Root} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/task/:id" exact component={Task} />
      <Route path="/new_task" exact component={TaskNew} />
      <Route path="/task/:id/edit" exact component={TaskEdit} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/category/:id" exact component={Category} />
      <Route path="/new_category" exact component={CategoryNew} />
      <Route path="/category/:id/update" exact component={CategoryEdit} />
    </Switch>
  </Router>
);