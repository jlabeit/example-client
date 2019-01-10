import React, { Component } from 'react'
import Login from './Login'
import Routing from './Routing'
import Vehicles from './Vehicles'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    if (!this.state.token) {
      return <Login onSuccess={token => this.setState({ token })} />
    }
    return (
      <div>
        <button onClick={() => this.setState({ token: undefined })}>
          logout
        </button>
        <Routing token={this.state.token} />
        <Vehicles token={this.state.token} />
      </div>
    )
  }
}

export default App
