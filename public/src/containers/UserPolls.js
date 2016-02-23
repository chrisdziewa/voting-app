import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserPolls } from '../actions/index';
import Poll from '../components/poll';


class GetUserPolls extends Component {
  componentWillMount() {
    this.props.fetchUserPolls(this.props.username);
  }
  renderChoices(choices) {
    return Object.keys(choices).map(choice => {
      return <li key={choice}>{choice}</li>
    });
  }

  renderPolls() {
    let { userPolls } = this.props;
    if (typeof userPolls !== 'undefined') {
      if (userPolls.length < 1) {
        return (
          <h3>{this.props.username} has not created any polls yet</h3>
        );
      }
      return userPolls.map((poll) => {
        return (
          <li className="well poll" key={poll._id}>
            <Poll choices={Object.keys(poll.choices)}
              user={this.props.user}
              id={poll._id} question={poll.question}
            />
          </li>
        );
      });
    }
    return null;
  }

  render() {
    return (
      <div className="container-fluid">
        <ul>
          {this.renderPolls()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userPolls: state.polls.userPolls,
    user: state.user
  }
}

export default connect(mapStateToProps, { fetchUserPolls })(GetUserPolls);
