import React, { Component } from 'react'
import './loading.css'

export default class SignedIn extends Component {
  render() {  
    return this.props.active ? <div class="loading"><div></div></div> : '';
  }
}