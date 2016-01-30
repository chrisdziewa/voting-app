import React, { Component } from 'react';

export default class SignupForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h3>Sign Up</h3>
          <form>
            <label htmlFor="name" className="pull-left">Name</label>
            <br/>
            <input type="text" id="name" className="form-controls"/>
            <br/>
            <label htmlFor="email" className="pull-left">Email</label>
            <br/>
            <input type="text" id="email" className="form-controls"/>
            <br/>
            <label htmlFor="password" className="pull-left">Password</label>
            <br/>
            <input type="password" id="password" className="form-controls"/>
            <br/>
            <label htmlFor="confirm" className="pull-left">Confirm Password</label>
            <br/>
            <input type="password" id="confirm" className="form-controls"/>
            <br/>
            <input type="submit" className="pull-left form-controls btn btn-primary" value="Submit" />
            <p className="pull-left">Already have an account?&nbsp;<a href="#">Login</a></p>
          </form>
        </div>
      </div>
    );
  }
}