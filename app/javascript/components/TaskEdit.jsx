import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import city from "./Tokyo.png";
import { Checkbox } from "semantic-ui-react";
import Navigation from "./Navigation";


class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: false,
      category_ids: [],
      allCategories: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;
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
          title: data.task.title,
          description: data.task.description,
          status: data.task.status,
          category_ids: data.categories.map(cat => cat.id),
          allCategories: data.allCategories
        })
        }
    );
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
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

  handleStatus(event) {
    let status = event.target.checked;
    this.setState({[event.target.name]: status});
    console.log(this.state.status);
  }

  onSubmit(event) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    event.preventDefault();
    const url = `/api/v1/edit/${id}`;
    const { title, description, status, category_ids } = this.state;

    if (title.length === 0)
      return;

    const body = {
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
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => {
        window.alert("Task title duplicated, please try another one.");
        console.log(error)
      });
  }

  render() {
    return (
      <div>
        <Navigation admin={this.props.admin} active={"task_edit"} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"444"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">Update Task</h1>
            <h4>Update existing task that you've created earlier</h4>
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
                  <input type="text" defaultValue={this.state.title} name="title" id="taskTitle" className="form-control" required onChange={this.onChange}/>
                </div>
                <h5>Description</h5>
                <div className="field">
                  <label htmlFor="description"/>
                  <textarea className="form-control" id="description" defaultValue={this.state.description} name="description" rows="5" required onChange={this.onChange}/>
                </div>
                <h5>Categories</h5>
                <div className="inline fields">
                  { this.state.allCategories.map((cat) => {
                    if (this.state.category_ids.includes(cat.id)) {
                      return <div className="field" key={cat.id}>
                        <div className="ui checkbox">
                          <input type="checkbox" className="hidden" defaultChecked={true} value={cat.id}
                                 name="category_ids"
                                 id={"task_category_ids_" + cat.id} onChange={this.handleCheck}/>
                          <label className="checkbox-inline input_checkbox"
                                 htmlFor={"task_category_ids_" + cat.id}>{cat.name}</label>
                        </div>
                      </div>
                    } else {
                      return <div className="field" key={cat.id}>
                        <div className="ui checkbox">
                          <input type="checkbox" className="hidden" defaultChecked={false} value={cat.id}
                                 name="category_ids"
                                 id={"task_category_ids_" + cat.id} onChange={this.handleCheck}/>
                          <label className="checkbox-inline input_checkbox"
                                 htmlFor={"task_category_ids_" + cat.id}>{cat.name}</label>
                        </div>
                      </div>
                    }
                  })
                  }
                </div>
                <h5>Status</h5>
                  <Checkbox slider name="status" id="taskStatus"
                            checked={this.state.status}
                            onChange={this.handleStatus}
                            label="Slide to change status"
                  />
                <br/><br/>
                <button type="submit" className="ui basic blue button">
                  Update Task
                </button>
                <Link to="/tasks" className="ui basic teal button">Back to Tasks</Link>
              </form><br/>
            </div>
          </div>
        </div><br/><br/>
        <Footer />
      </div>
    )
  }
}

export default TaskEdit