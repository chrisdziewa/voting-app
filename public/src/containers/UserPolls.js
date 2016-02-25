import React, { Component } from 'react';
import Poll from '../components/poll';


class UserPolls extends Component {
  renderPolls() {
    let { polls } = this.props;
    if (typeof polls !== 'undefined') {
      if (polls.length < 1) {
        return (
          <h3>{this.props.username} has not created any polls yet</h3>
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
      <div className="container-fluid">
        <ul>
          {this.renderPolls()}
        </ul>
      </div>
    );
  }
}

export default UserPolls;
