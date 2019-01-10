import React, { Component } from 'react'

class Routing extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { token } = this.props
    return (
      <div>
        <h1>Routing example with toll costs</h1>
        {token}
      </div>)
  }
}

export default Routing
