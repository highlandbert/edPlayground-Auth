import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AuthService from '../auth.service';

export default class SignedIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: AuthService.hasCredentials(),
      username: AuthService.getUsername()
    };
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    AuthService.deleteCredentials();
    this.setState({ authenticated: false });
    event.preventDefault();
  }

  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/signin" />
    }
    
    return (
      <div className="section">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <h2>edPlayground</h2>
            <form className="form-box" onSubmit={this.signOut}>
              <h3>Hi {this.state.username}!</h3>
              <a>Discover</a>
              <a>Learn</a>
              <button className="button is-block is-info is-fullwidth">Sign Out</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}