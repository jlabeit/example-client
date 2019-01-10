import React, { Component } from 'react'
import Login from './Login'

const ExampleApi = () => <div/>
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
        <ExampleApi token={this.state.token} />
      </div>
    )
  }
}

export default App
