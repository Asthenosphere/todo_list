import React from "react"
import PropTypes from "prop-types"
class Root extends React.Component {
  render () {
    return (
      <React.Fragment>
        Welcome: {this.props.welcome}
      </React.Fragment>
    );
  }
}

Root.propTypes = {
  welcome: PropTypes.string
};
export default Root
