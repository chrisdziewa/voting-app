import React, { Component } from 'react';
import PollChoice from './poll-choice';

export default class Poll extends Component {
  renderPollChoices() {
    if (typeof this.props.choices === 'undefined') {
      return null;
    }
    return this.props.choices.map(choice => {
      return <li key={choice}><PollChoice choice={choice} /></li>
    });
  }

  render() {
    return (
      <div className="poll-content">
        <h3>{this.props.question}</h3>
        <ul>
          {this.renderPollChoices()}
        </ul>
      </div>
    );
  }
}