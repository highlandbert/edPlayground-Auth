import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SignInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  getValue() {
    return this.state.value;
  }
  
  render() {
    
    const icon = this.props.type === 'password'
      ? <i className="fas fa-lock"></i>
      : <i className="fas fa-user"></i>;
        
    return (
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" value={this.state.value} onChange={this.handleChange}
            type={this.props.type} placeholder={this.props.placeholder}/>
          <span className="icon is-small is-left">
            {icon}
          </span>
        </p>
      </div>
    );
  }
}