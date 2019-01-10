import React, { Component } from 'react'
import GraphqlClient from 'graphql-client'

const GET_COSTPROFILES = `
  query getcostprofiles {
    costprofiles {
      _id
      name
      data {
        vehicles {
          id
          name
          finance
        }
      }
    }
  }
`

class Vehicles extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  componentDidMount() {
    console.log('setting token', this.props.token)
    const client = GraphqlClient({
      url: 'http://services.impargo.de:5000',
      headers: {
        Authorization: this.props.token,
      }
    })
    client.query(GET_COSTPROFILES).then((body) => {
      const { errors, data } = body
      if (errors && errors.length > 0) {
        console.error('gettings vehicles failed because', errors[0].message)
      } else {
        const { costprofiles: { data: { vehicles } } } = data
        console.log('got vehicles successfull', vehicles)
        this.setState({ vehicles })
      }

      console.log(body)
    }).catch((err) => {
      console.error('login mutation request failed', err.message)
    })
  }
  renderVehicles() {
    if (!this.state.vehicles) {
      return <div>Loading...</div>
    }
    return (
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>finance type</th>
        </tr>
        {this.state.vehicles.map(({ id, name, finance }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{finance}</td>
          </tr>
        ))}
      </table>
    )
  }
  render() {
    return (
      <div>
        <h1>List all vehicles</h1>
        {this.renderVehicles()}
      </div>)
  }
}

export default Vehicles
