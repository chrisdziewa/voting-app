import React, { Component } from 'react';
import Poll from './poll';

class PollsList extends Component {
  renderPolls() {
    let { polls } = this.props;
    if (typeof polls !== 'undefined') {
      if (polls.length < 1) {
        return (
          <div></div>
        );
      }
      return polls.map((poll) => {
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
        <ul>
          {this.renderPolls()}
        </ul>
    );
  }
}

export default PollsList;