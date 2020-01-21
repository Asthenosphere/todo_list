import React from 'react';
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Footer from "./Footer";
import city from "./Venice.png";
import Navigation from "./Navigation";

class CategoryNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { name, description } = this.state;
    if (name.length === 0 || description.length === 0)
      return;

    let body = {
      name,
      description
    };

    const url = "/api/v3/categories/create";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        if (response[0] === "Name has already been taken") {
          window.alert("Category name duplicated, please try another one.");
          return;
        }
        this.props.history.push(`/category/${response.id}`);
      })
      .catch(error => {

        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navigation admin={this.props.admin} active={"category_new"} current={this.props.current}/>
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"532"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">New Category</h1>
            <h4>Create a category to tag your tasks</h4>
          </div>
        </section>
        <div className="ui grid">
          <div className="ui five wide column"/>
          <div className="ui six wide column">
            <div className="ui center aligned segment">
              <form className="ui form" onSubmit={this.onSubmit}>
                <br/>
                <h5>Name</h5>
                <div className="field">
                  <label htmlFor="categoryName"/>
                  <input type="text" placeholder="Name of Category" name="name" id="categoryName" autoFocus="autofocus" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea placeholder="Description of Category" className="form-control" id="description" name="description" rows="5" required onChange={this.onChange}/>
                </div>
                <br/>
                <button type="submit" className="ui basic blue button">
                  Create Category
                </button>
                <Link to="/categories" className="ui basic teal button">Back to Categories</Link>
                <Link to="/tasks" className="ui basic violet button">Back to Tasks</Link>
              </form><br/>
            </div>
          </div>
        </div><br/><br/><br/>
        <Footer /><br/>
      </div>
    )
  }
}

export default CategoryNew