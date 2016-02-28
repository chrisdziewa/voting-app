import React, { Component } from 'react';
import { connect } from 'react-redux';
import Poll from '../components/poll.js';
import { fetchSinglePoll } from '../actions/index';

class SinglePollPage extends Component {
  componentWillMount() {
    let { username, question } = this.props.params;
    this.props.fetchSinglePoll(username, question);
  }
  render() {
    let poll = this.props.singlePoll;
    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }

    if (!poll) {
      return null;
    }
    return (
      <div className='container single-poll-page'>
        <div className="well poll" key={poll._id}>
          <Poll
            choices={poll.choices}
            user={this.props.user}
            showResult={poll.showResult}
            id={poll._id}
            question={poll.question}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePoll: state.polls.singlePoll,
    user: state.user,
    isLoading: state.loader.isLoading
  }
}

export default connect(mapStateToProps, { fetchSinglePoll })(SinglePollPage);
