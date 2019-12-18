import React, { Component } from 'react'
import PropTypes from "prop-types"
import Jumbotron from "./Jumbotron";
import Navigation from "./Navigation";
import { Link } from "react-router-dom"


class Root extends Component {
  constructor() {
    super();
    this.state = {
      user_modules: [
        { id: 1, title: 'Setting up a new Ruby on Rails App with React', description: 'First step', completed: false},
        { id: 2, title: 'Adding React to an Existing Rails App', description: 'Second step', completed: false},
        { id: 3, title: 'Building a Hello World App', description: 'Third step', completed: false},
        { id: 4, title: 'Adding React Router DOM to your App', description: 'Fourth step', completed: false},
      ]
    }
  }
  render () {
    return (
      <Jumbotron/>
    );
  }
}

Root.propTypes = {
  welcome: PropTypes.string
};
export default Root
