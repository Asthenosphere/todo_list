import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Barcelona.png";
import person from "./person-fill.svg";
import Navigation from "./Navigation";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { username: "", email: "", created_at: ""}};
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v2/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ user: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  deleteUser() {
    let ask = window.confirm("Are you sure you want to delete this user?");
    if (!ask) {
      return;
    }
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v2/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/users"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { user } = this.state;
    const date = user.created_at;
    const cdate = (new Date(date)).toDateString();

    return (
      <div>
        <Navigation admin={this.props.admin} active={"user"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"455"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">{user.username}</h1>
          </div>
        </section>

        <div className="ui centered six column grid">
          <div className="ui card">
            <div className="content">
              <div className="image">
                <img src={person} width={"192"} height={"192"}/>
              </div>
              <div className="ui divider"/>
              <div className="center header">{user.username}</div>
              <div className="meta">Joined on {cdate}</div><br/>
              <div className="description">Email Address</div>
              <div className="meta">{user.email}</div>
            </div>
          </div>
        </div><br/><br/><br/>
        <div className="container">
          <div className="center">
            <button type="button" className="ui basic red button" onClick={this.deleteUser}>Delete User</button>
            {"  "}
            <Link to="/users" className="ui basic teal button">Back to Users</Link>
          </div>
        </div><br/><br/><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default User