import React from "react";
import img from './list-check.svg';

class AboutPage extends React.Component {
  render() {
    return (
      <div className={"center jumbotron-fluid"}>
        <h1>About To-do List</h1><br></br>
        <div className="text-md-center">
          <p>
            This is an online To-do List with the frontend written using the React framework and the backend written
            using Ruby on Rails.
          </p><br></br>
          <img src={img} width={"32"} height={"32"}/>
        </div>
      </div>
    );
  }
}

export default AboutPage