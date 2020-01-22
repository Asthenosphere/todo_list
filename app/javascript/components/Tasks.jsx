import React from "react";
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Footer from "./Footer";
import city from './London.png'
import Navigation from "./Navigation";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { tasks } = this.state;
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
      <div>
        <Navigation admin={this.props.admin} active={"tasks"} current={this.props.current} />
        <section className="jumbotron jumbotron-fluid text-center bg-transparent">
          <img src={city} width={"448"} height={"200"}/>
          <div className="container py-5">
            <h1 className="display-4">All Tasks</h1>
            <h4>
              Listing all tasks created
            </h4>
          </div>
        </section>
        <div className="center">
          <main className="container">
            <div className="center">
              <Link to="/new_task" className="ui basic blue button">
                Create New Task
              </Link>
              <Link to="/new_category" className="ui basic violet button">
                Create New Category
              </Link>
            </div><br/><br/>
            <div className="row">
              {allTasks}
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

export default Tasks