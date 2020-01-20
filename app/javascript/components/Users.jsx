import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from './Istanbul.png';
import Navigation from "./Navigation";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const url = "/api/v2/users/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ users: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { users } = this.state;
    const allUsers = users.map((user, index) => (
      <div key={index} className="col-md-5 col-lg-3">
        <div className="ui stacked card mb-5">
          <div className="content">
            <div className="header">{user.username}</div>
            <div className="description">{user.email}</div>
          </div>
          <div className="extra content">
            <Link to={`/user/${user.id}`} className="ui basic orange button">
              View User
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <Navigation admin={this.props.admin} active={"users"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"589"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">All Users</h1>
            <h4>
              Listing all To-do List users
            </h4>
          </div>
        </section>
        <div className="center">
          <main className="container">
            <div className="row">
              {allUsers}
            </div>
            <Link to="/" className="ui basic teal button">
              Home
            </Link>
          </main>
        </div><br/><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default Users