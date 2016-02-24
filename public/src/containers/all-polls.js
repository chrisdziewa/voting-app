import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPolls } from '../actions/index';
import Poll from '../components/poll';


class GetAllPolls extends Component {
  componentWillMount() {
    this.props.fetchAllPolls();
  }

  renderPolls() {
    if (typeof this.props.polls === 'undefined' || this.props.polls.length < 1) {
      return (
        <h3>There are no polls yet!</h3>
      );
    }
    if (typeof this.props.polls !== 'undefined') {
      return this.props.polls.map((poll) => {
        return (
          <li className="well poll" key={poll._id}>
            <Poll choices={poll.choices}
              user={this.props.user}
              showResult={poll.showResult}
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
    polls: state.polls.all,
    user: state.user
  }
}

export default connect(mapStateToProps, { fetchAllPolls })(GetAllPolls);
