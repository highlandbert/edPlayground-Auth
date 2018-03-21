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

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Redirect to="/signin" />
          </Switch>
      </Router>
    );
  }
}

export default App
