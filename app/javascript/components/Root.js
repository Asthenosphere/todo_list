import React from "react"

class Root extends React.Component {
  render() {
    return (
      <div className={"center jumbotron"}>
        <h1>To-do List</h1>
        <a href={"signup"} className={"btn btn-primary btn-lg btn-xlarge"}>Sign up now</a>
      </div>
    );
  }
}

export default Root
