import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

import SignInput from '../sign-input/SignInput'
import Loading from '../loading/Loading'
import AuthService from '../auth.service'
import ApiService from '../api.service'

export default class SignIn extends Component {

  constructor(props) {
    super(props);

    let redirect = undefined;
    if (props.location.search.includes('?redirect=')) {
      redirect = props.location.search.replace('?redirect=', '');
    }

    this.state = {
      loading: false,
      failed: false,
      authenticated: AuthService.hasCredentials(),
      redirect: redirect,
      justSignedUp: props.location.search === '?just_signed_up'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged = () => this.setState({ failed: false });

  handleSubmit = (event) => {

    event.preventDefault();

    var params = new URLSearchParams();
    params.set('username', this.username.getValue());
    params.set('password', this.password.getValue());

    this.setState({ loading: true });

    ApiService.post('authenticate', params)
      .then(result => {
        if (result.error) {
          throw result.error;
        }
        AuthService.saveCredentials(result.token, result.username, result._id);
        if (this.state.redirect) {
          window.location.href = this.state.redirect;
        } else {
          this.setState({ authenticated: true, loading: false })
        }
      })
      .catch(error => {
        this.setState({ failed: true, loading: false });
      });
  };

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/profile" />
    }

    let justSignedUp = '';
    if (this.state.justSignedUp) {
      justSignedUp = <div className="notification is-primary">
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
          <div className="column is-4 is-offset-4">
            {justSignedUp}
            <form className="form-box boxi" onSubmit={this.handleSubmit}>
              <Loading active={this.state.loading}/>
              <SignInput type="user" placeholder="Username" required="true" onChange={this.inputChanged}
                ref={(input) => { this.username = input; }} />
              <SignInput type="password" placeholder="Password" required="true" onChange={this.inputChanged}
                ref={(input) => { this.password = input; }} />
              {error}
              <button className="ed-link">Sign In</button>
            </form>
            <div className="links">
              <Link className="ed-link" to="/signup">I don't have an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}