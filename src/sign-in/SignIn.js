import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

import SignInput from '../sign-input/SignInput'
import Loading from '../loading/Loading'
import AuthService from '../auth.service'

export default class SignIn extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      failed: false,
      authenticated: AuthService.hasCredentials(),
      justSignedUp: props.location.search === '?just_signed_up'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
  }
  
  inputChanged() {
    this.setState({ failed: false });
  }

  handleSubmit(event) {

    var params = new URLSearchParams();
    params.set('username', this.username.getValue());
    params.set('password', this.password.getValue());

    this.setState({ loading: true });

    fetch('http://localhost:8080/api/authenticate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
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
        AuthService.saveCredentials(result.token, result.username, result._id);
        this.setState({ authenticated: true, loading: false })
      })
      .catch(error => {
        this.setState({ failed: true, loading: false });
      });

    event.preventDefault();
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/signedin" />
    }

    let justSignedUp = '';
    if (this.state.justSignedUp) {
      justSignedUp = <div class="notification is-primary">
        Registration Completed!
      </div>
    }

    let error = '';
    if (this.state.failed) {
      error = <div className="error">
        Invalid username or password
      </div>
    }

    return (
      <div className="section">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <h2>edPlayground</h2>
            {justSignedUp}
            <form className="form-box" onSubmit={this.handleSubmit}>
              <Loading active={this.state.loading}/>
              <SignInput type="user" placeholder="Username" required="true" onChange={this.inputChanged}
                ref={(input) => { this.username = input; }} />
              <SignInput type="password" placeholder="Password" required="true" onChange={this.inputChanged}
                ref={(input) => { this.password = input; }} />
              {error}
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