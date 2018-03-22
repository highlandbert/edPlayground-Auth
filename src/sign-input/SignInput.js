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

    if (this.props.onChange)
      this.props.onChange(event)
  }

  getValue() {
    return this.state.value;
  }
  
  render() {
    
    let icon = '';
    let controlClassName = 'control has-icons-left';
    
    if (this.props.type === 'user') 
      icon = <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
    else if (this.props.type === 'password')
      icon = <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
    else if (this.props.type === 'email')
      icon = <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
    else if (this.props.type === 'date')
      icon = <span className="icon is-small is-left"><i className="fas fa-calendar"></i></span>
    else
      controlClassName = 'control';

    const type = this.props.type === 'user' ? 'text' : this.props.type;
    const asterisk = this.props.required ? <span className="required">required</span> : '';

    return (
      <div className="field">
        <label className="label">{this.props.placeholder}{asterisk}</label>
        <div className={controlClassName}>
          <input className="input" required={this.props.required} value={this.state.value} 
          type={type} onChange={this.handleChange}/>
          {icon}
        </div>
      </div>
    );
  }
}