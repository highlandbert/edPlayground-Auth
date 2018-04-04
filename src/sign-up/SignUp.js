import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AuthService from '../auth.service'
import ApiService from '../api.service'
import SignInput from '../sign-input/SignInput'
import Loading from '../loading/Loading'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      loading: false,
      failed: false,
      error: '',
      authenticated: AuthService.hasCredentials()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    var params = new URLSearchParams();
    params.set('username', this.username.getValue());
    params.set('password', this.password.getValue());
    params.set('name', this.name.getValue());
    params.set('surname', this.surname.getValue());
    params.set('mail', this.mail.getValue());
    params.set('birth', this.birth.getValue());

    this.setState({ loading: true });

    ApiService.post('users', params)
      .then(result => {
        if (result.error) {
          throw result.error;
        }
        this.setState({ done: true });
      })
      .catch(error => {
        this.setState({
          failed: true,
          loading: false,
          error: error.code && error.code === 11000
            ? this.username.getValue() + ' is taken, sorry'
            : 'Something went wrong :('
        })
        console.log(error);
      });
  }

  onPasswordChange(e) {
    const value = e.target.value;
    if (value.length < 8) {
      e.target.setCustomValidity("Passwords must be at least 8 characters long"); 
    } else {
      e.target.setCustomValidity("");
    }
  }

  onRepeatPasswordChange(e) {
    const value = e.target.value;
    const other = this.password.getValue();

    if (value !== other) {
      e.target.setCustomValidity("Passwords don't match"); 
    }
    else {
      e.target.setCustomValidity("");
    }
  }

  render() {
    if (this.state.done) {
      return <Redirect to="/signin?just_signed_up" />
    }

    if (this.state.authenticated) {
      return <Redirect to="/signedin" />
    }

    let error = '';
    if (this.state.failed) {
      error = <div className="error">{this.state.error}</div>
    }

    return (
      <div className="section">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <h2>edPlayground</h2>
            <form className="form-box" onSubmit={this.handleSubmit}>
              <Loading active={this.state.loading}/>
              <SignInput type="user" placeholder="Username" required="true"
                ref={(input) => { this.username = input; }} />
              <SignInput type="password" placeholder="Password" required="true"
                onChange={this.onPasswordChange}
                ref={(input) => { this.password = input; }} />
              <SignInput type="password" placeholder="Repeat password" required="true"
                onChange={this.onRepeatPasswordChange}
                ref={(input) => { this.repeatPassword = input; }} />
              <SignInput type="text" placeholder="Name" required="true"
                ref={(input) => { this.name = input; }} />
              <SignInput type="text" placeholder="Surname"
                ref={(input) => { this.surname = input; }} />
              <SignInput type="email" placeholder="Mail" required="true"
                ref={(input) => { this.mail = input; }} />
              <SignInput type="date" placeholder="Birth Date" required="true"
                ref={(input) => { this.birth = input; }} />
              {error}
              <button className="button is-block is-info is-fullwidth">Sign Up</button>
            </form>
            <div className="links">
              <Link to="/signin">I already have an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}