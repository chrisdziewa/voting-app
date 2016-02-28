import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PollsList from '../components/PollsList';
import { fetchAllPolls } from '../actions/index';
import { Link } from 'react-router';
import TitleList from '../components/TitleList';

class ProfilePage extends Component {
  componentWillMount() {
    this.props.fetchAllPolls(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.props.fetchAllPolls(nextProps.params.username);
    }
  }

  render() {
    let { username } = this.props.params;
    let loggedUser = this.props.user.username;

    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }
    return (
      <div className="profile-page">
        <div className="container">
          <div className="row profile-container">
            <div className="col-md-4 text-center">
              <div className="well profile-info">
                <h3>{ username }</h3>
                <div>
                  <div className="user-info">
                    <p>Polls created: { this.props.polls.length }</p>
                    <p>Description will go here</p>
                    {
                      loggedUser === username ?
                        <Link to={`/users/edit-user`}>
                        <i className='glyphicon glyphicon-cog'></i>
                        <span> edit account</span>
                      </Link>
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-8 text-center'>
              <h2
                className="recent-polls-header">
                {loggedUser === username ? 'My Polls' : 'Recent Polls'}
              </h2>

              {
                loggedUser === username ?
                  <TitleList polls={this.props.polls} username={loggedUser}/>
                :
                <PollsList
                  username={this.props.params.username}
                  user={this.props.user}
                  polls={this.props.polls}
                />
              }
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
    polls: state.polls.all,
    isLoading: state.loader.isLoading
  }
}

export default connect(mapStateToProps, { fetchAllPolls })(ProfilePage);
