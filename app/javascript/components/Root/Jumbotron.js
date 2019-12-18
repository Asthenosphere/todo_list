import React, { Component } from 'react'
import { Link } from "react-router-dom"

const Jumbotron = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">To-do List</h1>
        <p className="center">This is a To-do List App written with Ruby on Rails backend and React frontend.</p>
        <div className={"center"}>
          <button className="btn btn-primary" type="submit">Sign up now</button>

        </div>
      </div>
    </div>
  )
}

export default Jumbotron