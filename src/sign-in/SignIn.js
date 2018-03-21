import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import SignInput from '../sign-input/SignInput'

export default class SignIn extends Component { 

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    var searchParams = new URLSearchParams();
    searchParams.set('username', this.username.getValue());
    searchParams.set('password', this.password.getValue());

    fetch('http://localhost:8080/api/authenticate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
      })
      .then(res => {
        if (res.status === 500) {
          return res.text().then(error => ({ error: error }));
        }
        return res.json()
      })
      .then(result => {
        if (result.error) {
          throw result.error;
        }
        window.localStorage.setItem('auth-token', result.token);
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <h2>edPlayground</h2>
            <form className="form-box" onSubmit={this.handleSubmit}>
              <SignInput type="text" placeholder="Username"
                ref={(input) => { this.username = input; }} />
              <SignInput type="password" placeholder="Password"
                ref={(input) => { this.password = input; }} />
              <button className="button is-block is-info is-fullwidth">Sign In</button>
            </form>
            <div className="links">
              <Link to="/signup">I don't have an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}