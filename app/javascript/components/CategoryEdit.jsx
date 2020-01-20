import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Bristol.png";
import Navigation from "./Navigation";


class CategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
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

    const url = `/api/v3/show/${id}`;
    const _this = this;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      }).then(function(data) {
        console.log(data);
        _this.setState({
          name: data.category.name,
          description: data.category.description
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

    const { name, description } = this.state;

    if (name.length === 0 || description.length === 0)
      return;

    const body = {
      name,
      description
    };

    const url = `/api/v3/update/${id}`;
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
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/category/${response.id}`))
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div>
        <Navigation admin={this.props.admin} active={"category_edit"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"513"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">Update Category</h1>
            <h4>Update existing category that you've created earlier</h4>
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
                  <input type="text" defaultValue={this.state.name} name="name" id="categoryName" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea className="form-control" id="description" defaultValue={this.state.description} name="description" rows="5" required onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="ui basic blue button">
                  Update Category
                </button>
                <Link to="/categories" className="ui basic teal button">Back to Categories</Link>
              </form><br/>
            </div>
          </div>
        </div><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default CategoryEdit