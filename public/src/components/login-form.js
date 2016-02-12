import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';

class LoginForm extends Component {
  onSubmit(props) {
    this.props.loginUser(props)
      .then((data) => {
    // will go to profile page
    // TODO: create profile page
        if (data.success) {
          alert(data.message);
        }
      });
  }

  
  render() {
    const { fields: { email, password }, handleSubmit} = this.props;
    return (
      <div className="login-page">
        <div className="form-container">
          <h3>Sign into your account</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
              <label htmlFor="email" className="pull-left">Email</label>
              <br />
              <input type="text" id="email" className="form-control" {...email}/>
              <div className="text-help text-danger">
                  {email.touched ? email.error : ''}
              </div>
            </div>
            <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
              <label htmlFor="password" className="pull-left">Password</label>
              <br />
              <input type="password" id="password" className="form-control" {...password}/>
              <div className="text-help text-danger">
                {password.touched ? password.error : ''}
              </div>
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

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter your email address';
  }
  else if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Enter your password';
  }

  return errors;
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
}, null, { loginUser })(LoginForm);