import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Paris.png";
import tag from "./tag-fill.svg";
import Navigation from "./Navigation";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: { name: "", description: ""}, tasks: []};
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v3/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response);
        this.setState({ category: response.category, tasks: response.tasks});
      })
      .catch(() => this.props.history.push("/categories"));
  }

  deleteCategory() {
    let ask = window.confirm("Are you sure you want to delete this category?");
    if (!ask) {
      return;
    }
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v3/destroy/${id}`;
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
      .then(() => this.props.history.push("/categories"))
      .catch(error => console.log(error.message));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { category, tasks } = this.state;
    const categoryDescription = this.addHtmlEntities(category.description);
    const date = category.created_at;
    const cdate = (new Date(date)).toDateString();
    console.log(this.state);
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-5 col-lg-3">
        <div className="ui stacked card mb-5">
          <div className="content">
            <div className="header">
              {task.title}
            </div>
            <div className="description">{task.description}</div>
            {task.status ?
              <div className="ui green basic pointing label">Completed</div>
              :
              <div className="ui red basic pointing label">Ongoing</div>
            }
          </div>
          <div className="extra content">
            <Link to={`/task/${task.id}`} className="ui basic orange button">
              View Task
            </Link>
          </div>
        </div>
      </div>
    ));


    return (
      <div className="">
        <Navigation admin={this.props.admin} active={"category"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"400"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">{category.name}</h1>
          </div>
        </section>

        <div className="ui centered six column grid">
          <div className="ui card">
            <div className="content">
              <div className="image">
                <img src={tag} width={"192"} height={"192"}/>
              </div>
              <div className="ui divider"/>
              <div className="center header">{category.name}</div>
              <div className="meta">Created on {cdate}</div><br/>
              <div className="description">Description</div>
              <div className="meta">{category.description}</div>
            </div>
          </div>
        </div><br/><br/><br/>
        <div className="center ui huge header">All tasks under {category.name}</div>
        <br/><br/>
        {tasks.length === 0 ?
          <div className="center ui big header">No tasks under this category</div>
        :
          <div className="center">
            <main className="container">
              <div className="row">
                {allTasks}
              </div>
            </main>
          </div>
        }
        <br/><br/>
        <div className="container">
          <div className="center">
            <button type="button" className="ui basic red button" onClick={this.deleteCategory}>Delete Category</button>
            {"  "}
            <Link to={"/category/" + category.id + "/update"} className="ui basic blue button">Update Category</Link>
            {"  "}
            <Link to="/categories" className="ui basic teal button">Back to Categories</Link>
            <Link to="/tasks" className="ui basic violet button">Back to Tasks</Link>
          </div>
        </div><br/><br/><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default Category