import React, { Component } from 'react';
import WelcomeBanner from '../components/layout/WelcomeBanner';
import SiteInfoBar from '../components/layout/SiteInfoBar';
import PollsList from '../components/polls/PollsList';
import { connect } from 'react-redux';
import { fetchAllPolls } from '../actions/index';

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchAllPolls();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }
    return (
      <div className="home-page">
        <WelcomeBanner />
        <SiteInfoBar />
        <h2 className='recent-polls-header'>Recent Polls</h2>
        <PollsList
          user={this.props.user}
          polls={this.props.polls}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
    user: state.user,
    polls: state.polls.all
  }
}

export default connect(mapStateToProps, { fetchAllPolls })(HomePage);
