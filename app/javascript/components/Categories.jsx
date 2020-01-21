import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from './Genoa.png';
import Navigation from "./Navigation";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    const url = "/api/v3/categories/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response =>
        this.setState( { categories: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { categories } = this.state;
    const allCategories = categories.map((category, index) => (
      <div key={index} className="col-md-5 col-lg-3">
        <div className="ui stacked card mb-5">
          <div className="content">
            <div className="header">{category.name}</div>
            <div className="description">{category.description}</div>
          </div>
          <div className="extra content">
            <Link to={`/category/${category.id}`} className="ui basic orange button">
              View Category
            </Link>
          </div>
        </div>
      </div>
    ));
    return (
      <>
        <Navigation admin={this.props.admin} active={"categories"} current={this.props.current} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"522"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">All Categories</h1>
            <h4>
              Listing all categories created
            </h4>
          </div>
        </section>
        <div className="center">
          <main className="container">
            <div className="center">
              <Link to="/new_category" className="ui basic blue button">
                Create New Category
              </Link>
            </div><br/><br/>
            <div className="row">
              {allCategories}
            </div>
            <Link to="/" className="ui basic teal button">
              Home
            </Link>
          </main>
        </div><br/><br/><br/>
        <Footer />
      </>
    );
  }
}

export default Categories