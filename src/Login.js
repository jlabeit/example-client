import React, { Component } from 'react'
import GraphqlClient from 'graphql-client'

const client = GraphqlClient({
  url: 'http://services.impargo.de:5000',
  // Add authorization header if already logged in:
  // headers: {
  //   Authorization: 'Bearer ' + token
  // }
})

const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstname
        lastname
      }
      token
    }
  }`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    client.query(LOGIN_MUTATION, this.state).then((body) => {
      const { errors, data } = body
      if (errors && errors.length > 0) {
        console.error('login failed because', errors[0].message)
      } else {
        const { login: { token, user } } = data
        console.log('login successfull for user', user)
        this.props.onSuccess(token)
      }
    }).catch((err) => {
      console.error('login mutation request failed', err.message)
    })
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button type="submit">login</button>
      </form>)
  }
}
export default Login
