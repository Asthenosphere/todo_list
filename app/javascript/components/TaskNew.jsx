import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Rome.png";
import Navigation from "./Navigation";

class TaskNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "No description yet",
      status: false,
      category_ids: [],
      allCategories: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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
      .then(response => {
        console.log(response);
        this.setState({allCategories: response});
      })
      .catch(() => this.props.history.push("/"));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheck(event) {
    let value = event.target.value;
    let newArray;
    if (this.state.category_ids.indexOf(value) > -1) {
      newArray = this.state.category_ids.filter(s => s !== value);
    } else {
      newArray = [...this.state.category_ids, value];
    }
    this.setState( prevState => ({
      category_ids: newArray
    }));
  }


  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tasks/create";
    const { title, description, status, category_ids } = this.state;
    if (title.length === 0)
      return;

    let body = {
      title,
      description,
      status,
      category_ids
    };

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
      .then(response => {
        if (response[0] === "Title has already been taken") {
          window.alert("Task title duplicated, please try another one.");
          return;
        }
        this.props.history.push(`/task/${response.task.id}`);
      })
      .catch(error => {

        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navigation admin={this.props.admin} active={"task_new"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"556"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">New Task</h1>
            <h4>Create a new task to remind yourself</h4>
          </div>
        </section>
        <div className="ui grid">
          <div className="ui five wide column"/>
          <div className="ui six wide column">
            <div className="ui center aligned segment">
              <form className="ui form" onSubmit={this.onSubmit}>
                <br/>
                <h5>Title</h5>
                <div className="field">
                  <label htmlFor="taskTitle"/>
                  <input type="text" placeholder="Title of Task" name="title" id="taskTitle" autoFocus="autofocus" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea placeholder="Description of Task (e.g. time / location)" className="form-control" id="description" name="description" rows="5" onChange={this.onChange}/>
                </div>
                <h5>Categories</h5>
                <div className="inline fields">
                  { this.state.allCategories.map((cat) => {
                    return <div className="field" key={cat.id}>
                      <div className="ui checkbox">
                        <input type="checkbox" className="hidden" defaultChecked={false} value={cat.id} name="category_ids"
                               id={"task_category_ids_" + cat.id} onChange={this.handleCheck}/>
                        <label className="checkbox-inline input_checkbox"
                               htmlFor={"task_category_ids_" + cat.id}>{cat.name}</label>
                      </div>
                    </div>
                  })
                  }
                </div>
                <br/>
                <button type="submit" className="ui basic blue button">
                  Create Task
                </button>
                <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link><br/>
              </form><br/>
            </div>
          </div>
        </div><br/><br/><br/>
        <Footer /><br/>
      </div>
    )
  }
}

export default TaskNew