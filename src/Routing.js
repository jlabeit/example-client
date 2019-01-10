import React, { Component } from 'react'

const responseToJSON = response => new Promise((resolve, reject) => {
  if (response.ok) {
    return resolve(response.json())
  }
  return reject(new Error('request failed with code', response.status))
})

const postJSON = async (url, token, data) => responseToJSON(await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token,
  }),
}))

// Vehicle settings for the toll calculation.
const settings = { axis: "5", weight: 40, euronorm: "5", time: "day" }

class Routing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  async componentDidMount() {
    const queries = [{
      start: {lon: 13.393236, lat: 52.504043}, destination: {lon: 10, lat: 53.55},
    }]
    // Note: This is proxied to 'https://apps.impargo.de/api/routes' (see package.json).
    const responseRoutes = await postJSON('/api/routes', this.props.token, { queries, profile: 'truck' })
    if (!responseRoutes.ok) {
      console.error('error getting routes', responseRoutes)
      return
    }
    const { coordinates, distance, time, tolls } = responseRoutes.routes[0]
    console.log('coordinates of the route to diplay on map:', coordinates)
    const responseToll = await postJSON('/api/toll', this.props.token, {
      routes: [tolls],
      settings,
    })
    if (!responseToll.ok) {
      console.error('error getting toll', responseToll)
      return
    }
    const { amount } = responseToll.summary
    this.setState({
      loading: false,
      results: [
        { description: 'distance', value: `${Math.floor(distance / 1000)} km` },
        { description: 'time', value: `${Math.floor(time / 60)} min` },
        { description: 'toll', value: `${amount.toFixed(2)} €` },
    ]})
  }
  renderResults() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <table>
        <tbody>
          <tr>
            <th>description</th>
            <th>value</th>
          </tr>
          {this.state.results.map(({ description, value }) => (
            <tr key={description}>
              <td>{description}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  render() {
    return (
      <div>
        <h1>Routing example with toll costs</h1>
        {this.renderResults()}
      </div>)
  }
}

export default Routing
