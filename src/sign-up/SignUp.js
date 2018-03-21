import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SignUp extends Component { 
    render() {
      return (
        <div>
            Sign Up
            <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  }