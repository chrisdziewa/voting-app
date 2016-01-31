import React, { Component } from 'react';

export default class SignupForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h3>Sign Up</h3>
          <form>
            <div className="input-form-group">
              <label htmlFor="name" className="pull-left">Name</label>
              <br/>
              <input type="text" id="name" className="form-control"/>
            </div>
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
              <label htmlFor="confirm" className="pull-left">Confirm Password</label>
              <br/>
              <input type="password" id="confirm" className="form-control"/>
            </div>
            <div className="input-form-group">
               <input type="submit" className="pull-left form-control btn btn-primary" value="Submit" />
            </div>
            <p className="pull-left">Already have an account?<a href="#"> Login</a></p>
          </form>
        </div>
      </div>
    );
  }
}