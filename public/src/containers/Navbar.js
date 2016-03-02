import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
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
              <IndexLink to="/" activeStyle={{color: 'white'}} className="navbar-brand">Sondage</IndexLink>
            </div>
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a className="dropdown-toggle"
                    id="browse-menu"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                    Browse
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="browse-menu">
                    <li><IndexLink to="/users" activeClassName="active">users</IndexLink></li>
                    <li><IndexLink to="/polls" activeClassName="active">polls</IndexLink></li>
                  </ul>
                </li>
                <li>
                  {
                    this.props.user.loggedIn ?
                      <Link to={'/polls/create-poll'} activeClassName="active"><i className="glyphicon glyphicon-plus-sign"></i> Poll</Link>
                    : null
                  }
                </li>
                <li>
                  {
                    this.props.user.loggedIn ?
                      <Link to={`/users/${this.props.user.username}`} activeClassName="active">{this.props.user.username}</Link>
                    : <Link to="/signup" activeClassName="active">Sign up</Link>
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
                    : <Link to="/login" activeClassName="active">Login</Link>
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
    user: state.user.current
  }
}

export default connect(mapStateToProps, { logoutUser })(Navbar);
