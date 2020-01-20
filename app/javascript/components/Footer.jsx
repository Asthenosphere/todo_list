import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="ui divider"/>
        <div className="center">
          <small>
            Copyright &copy; 2020 - A To-do List with Ruby on Rails backend and React frontend
            by Asthenosphere
          </small>
        </div><br/>
      </div>
    )
  }
}

export default Footer