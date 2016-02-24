import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserPolls from './UserPolls';
import { Link } from 'react-router';

class ProfilePage extends Component {
  render() {
    let { username } = this.props.params;
    let loggedUser = this.props.user.username;
    return (
      <div className="profile-page">
        <div className="container">
          <div className="row profile-container">
            <div className="col-sm-4 text-center">
              <div className="well">
                <h1>{ username }</h1>
                <div>
                  <p>Description will go here</p>
                  {
                    loggedUser === username ?
                      <Link to={`/users/${loggedUser}/edit`}>
                        <i className='glyphicon glyphicon-cog'></i>
                        <span> edit account</span>
                      </Link>
                      : null
                  }
                </div>
              </div>
            </div>
            <div className="col-sm-8 text-center">
              <h2>Recent Polls</h2>
              <UserPolls username={username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ProfilePage);
