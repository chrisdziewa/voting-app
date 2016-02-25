import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserPolls from './UserPolls';
import { fetchUserPolls } from '../actions/index';
import { Link } from 'react-router';

class ProfilePage extends Component {
  componentWillMount() {
    this.props.fetchUserPolls(this.props.params.username);
  }

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
                  <div className="user-info">
                    <p>Polls created: { this.props.polls.length }</p>
                    <p>Description will go here</p>
                  </div>
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
            <div className='col-sm-8 text-center'>
              <h2>Recent Polls</h2>
              <UserPolls
                username={this.props.params.username}
                user={this.props.user}
                polls={this.props.polls}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    polls: state.polls.all
  }
}

export default connect(mapStateToProps, { fetchUserPolls })(ProfilePage);
