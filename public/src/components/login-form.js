import React, { Component } from 'react';

export default class SignupForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h3>Sign into Your Account</h3>
          <form>
            <div className="input-form-group">
              <label htmlFor="email" className="pull-left">Email</label>
              <br/>
              <input type="text" id="email" className="form-control"/>
            </div>
            <div className="input-form-group">
              <label htmlFor="password" className="pull-left">Password</label>
              <br/>
              <input type="password" id="password" className="form-control"/>
            </div>
            <div className="input-form-group">
              <input type="submit" className="btn-login pull-left form-control btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}