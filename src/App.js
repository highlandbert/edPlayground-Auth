import React, {Component} from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import SignIn from './sign-in/SignIn'
import SignUp from './sign-up/SignUp'
import Profile from './profile/Profile'

class App extends Component {
  render() {
    return (
      <div>
        <section className='bar'>
          <a href="/">edPlayground</a>
        </section>
        <Router basename="/auth">
          <Switch>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/profile" component={Profile}/>
            <Redirect to="/signin" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App
