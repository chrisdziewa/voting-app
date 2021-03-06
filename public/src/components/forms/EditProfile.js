import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { updateAccount } from '../../actions/index';


class EditProfile extends Component {
  onSubmit(props) {
    this.props.updateAccount(this.props.user.id, props);
  }

  render() {
    const { fields: { username, email, password, passwordConfirmation, currentPassword }, handleSubmit } = this.props;
    let loggedUser = this.props.user;

    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }
    return (
      <div className="edit-page">
        <div className="form-container">
          <h3>Edit Account</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={`form-group ${username.touched && username.invalid ? 'has-error' : ''}`}>
              <label htmlFor="username" className="pull-left">Username</label>
              <br/>
              <input type="text" id="username" className="form-control" {...username}/>
              <div className="text-help text-danger">
                {username.touched ? username.error : ''}
              </div>
            </div>
            <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
              <label htmlFor="email" className="pull-left">Email</label>
              <br/>
              <input type="text" id="email" className="form-control" {...email}/>
              <div className="text-help text-danger">
                {email.touched ? email.error : ''}
              </div>
            </div>
            <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
              <label htmlFor="password" className="pull-left">New Password</label>
              <br/>
              <input type="password" id="password" className="form-control" {...password}/>
              <div className="text-help text-danger">
                {password.touched ? password.error : ''}
              </div>
            </div>
            <div className={`form-group ${password.valid && passwordConfirmation.touched && passwordConfirmation.invalid ? 'has-error' : ''}`}>
              <label htmlFor="confirm" className="pull-left">Confirm New Password</label>
              <br/>
              <input type="password" id="confirm" className="form-control" {...passwordConfirmation}/>
              <div className="text-help text-danger">
                {passwordConfirmation.touched ? passwordConfirmation.error : ''}
              </div>
            </div>
            <div className={`form-group ${currentPassword.touched && currentPassword.invalid ? 'has-error' : ''}`}>
              <label htmlFor="currentPassword" className="pull-left">Current Password</label>
              <br/>
              <input type="password" id="currentPassword" className="form-control" {...currentPassword}/>
              <div className="text-help text-danger">
                {currentPassword.touched ? currentPassword.error : ''}
              </div>
            </div>
            <div className="btn-group">
              <input type="submit" className="btn btn-primary" value="Save Changes" />
              <Link to={`/users/${this.props.user.username}`} className="btn btn-default btn-cancel">Cancel</Link>
            </div>
            <Link to={`/users/${this.props.user.username}`} className="btn back-link"> Back to Profile</Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Enter a username';
  }

  else if (values.username.length < 3 || values.username.length > 50) {
    errors.username = "Username must be between 3 and 50 characters long";
  }

  if (!values.email) {
    errors.email = 'Enter an email';
  }
  else if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (values.password && (values.password.length > 0 &&
      (values.password.length < 6 || values.password.length > 32))) {
        errors.password = 'Passwords must be between 6 and 32 characters';
  }

  else {
    if (values.password && values.password.length > 0 && !values.passwordConfirmation) {
      errors.passwordConfirmation = 'Confirm your new password';
    }

    else if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match"
    }
  }

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password required to make changes'
  }

  return errors;
}

const mapStateToProps = (state) => {
  let data = {
    username: state.user.current.username,
    email: state.user.current.email,
    password: '',
    passwordConfirmation: '',
    currentPassword: ''
  }

  return {
    isLoading: state.loader.isLoading,
    user: state.user.current,
    initialValues: data
  }
}

export default reduxForm({
  form: 'EditForm',
  fields: ['username', 'email', 'password', 'passwordConfirmation', 'currentPassword'],
  validate
}, mapStateToProps, { updateAccount })(EditProfile);
