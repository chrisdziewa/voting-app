import React, { Component } from 'react';
import PollTitle from '../polls/PollTitle';

export default class TitleList extends Component {
  renderTitles() {
    if (!this.props.polls) {
      return null;
    }

    let list = this.props.polls.map((pollInfo) => {
      return (
        <PollTitle
          _id={pollInfo._id}
          key={pollInfo._id}
          question={pollInfo.question}
          dispatch={this.props.dispatch}
          username={this.props.username}
        />
      );
    });

    return list;
  }

  render() {
    return (
      <div className="panel panel-default">
        <table className="table current-user-polls">
          <tbody>
          {this.renderTitles()}
        </tbody>
      </table></div>
    );
  }
}
