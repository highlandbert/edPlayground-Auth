import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AuthService from '../auth.service'
import ApiService from '../api.service'
import Loading from '../loading/Loading'

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: AuthService.hasCredentials(),
      username: AuthService.getUsername(),
      loading: true,
      name: '...',
      mail: '...',
      birth: '...',
      since: '...'
    };
    this.signOut = this.signOut.bind(this);

    this.getUser().then(user =>
      this.setState({
        'loading': false,
        'name': user.name,
        'mail': user.mail,
        'birth': (new Date(user.birth)).toLocaleDateString(),
        'since': (new Date(user.since)).toLocaleDateString()
      }));
  }

  getUser = () => {
    const auth = AuthService.getCredentials();
    const id = auth._id;

    return ApiService.get(`users/${id}`)
      .then(response => {
        if (response.error) {
          AuthService.doLogin();
        } else {
          return response;
        }
      });
  };

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
          <div className="column is-6 is-offset-3">
            <div className="links profile">
              <a className="ed-link" href="/discover">Discover</a>
              <a className="ed-link" href="/learn">Learn</a>
            </div>
            <form className="form-box boxi" onSubmit={this.signOut}>
              <Loading active={this.state.loading}/>
              <h3>
                <i className="fas fa-user"></i>&nbsp;
                {this.state.username}
              </h3>
              <div className="property">
                <p className="name">Name</p>
                <p className="value">{this.state.name}</p>
              </div>
              <div className="property">
                <p className="name">Mail</p>
                <p className="value">{this.state.mail}</p>
              </div>
              <div className="property">
                <p className="name">Birth</p>
                <p className="value">{this.state.birth}</p>
              </div>
              <div className="property">
              <p className="name">Since</p>
              <p className="value">{this.state.since}</p>
            </div>
              <button className="ed-link">Sign Out</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}