import React, { Component } from 'react'
import './loading.css'

export default class SignedIn extends Component {
  render() {  
    return this.props.active ? <div className="loading"><div></div></div> : '';
  }
}