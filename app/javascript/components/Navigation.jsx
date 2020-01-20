import React from 'react';
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui inverted menu">
        <Link to="/tasks" className={this.props.active === "tasks" ? "active item" : "item"}>Tasks</Link>
        <Link to="/new_task" className={this.props.active === "new_task" ? "active item" : "item"}>New Task</Link>
        <Link to="/categories" className={this.props.active === "categories" ? "active item" : "item"}>Categories</Link>
        <Link to="/new_category" className={this.props.active === "new_category" ? "active item" : "item"}>New Category</Link>
        {this.props.admin ?
          <Link to="/users" className={this.props.active === "users" ? "active item" : "item"}>Users</Link>
          :
          undefined
        }
        <div className="right menu">
          <Link to="/" className={this.props.active === "home" ? "active item" : "item"}>
            Home
          </Link>
        </div>
      </div>
    );
  }
}
