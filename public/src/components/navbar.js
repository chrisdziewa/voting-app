import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';

class Navbar extends Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <nav className="navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-expanded="false"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">Sondage</Link>
            </div>
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  {
                    this.props.user.loggedIn ?
                      <Link to={'/polls/create-poll'}><i className="glyphicon glyphicon-plus-sign"></i> Poll</Link>
                        : null
                    }
                  </li>
                  <li>
                    {
                      this.props.user.loggedIn ?
                      <Link to={`/users/${this.props.user.username}`}>{this.props.user.username}</Link>
                      : <Link to="/signup">Sign up</Link>
                    }
                  </li>
                  <li>
                    {
                      this.props.user.loggedIn ?
                      <a
                        onClick={this.handleLogout.bind(this)}
                        href="#"
                      >
                      logout</a>
                      : <Link to="/login">Login</Link>
                    }
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logoutUser })(Navbar);
