import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <div className={"container"}>
        <footer className="footer">
          <small>
            Copyright &copy; <p>A To-do List with Ruby on Rails backend and React frontend
            by Asthenosphere</p>
          </small>
          <nav>
            <ul>
              <a href={"about"}>About</a>
            </ul>
          </nav>
        </footer>
      </div>
    )
  }
}

export default Footer