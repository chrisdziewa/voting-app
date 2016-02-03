import React, { Component } from 'react';
import PollChoice from './poll-choice';
import PollResult from '../containers/poll-result';

export default class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = { showResult: false };
  } 

  renderPollChoices() {
    if (typeof this.props.choices === 'undefined') {
      return null;
    }
    return this.props.choices.map(choice => {
      return <li key={choice}><PollChoice disabled={true} choice={choice} /></li>
    });
  }

  renderPoll() {
    return (
      <ul>
        <form>
          {this.renderPollChoices()}
          <PollChoice disabled={false} />
          <div className="input-form-group">
            <button 
              onClick={this.handleVoteClick.bind(this)}
              className="btn btn-primary form-control" 
              type="submit"
            >
              Vote
            </button>
          </div>
        </form>
      </ul>
    );
  }

  handleVoteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showResult: true
    });
  }

  renderPollResult() {
    // When clicked, change state to showResult and only show result
    return (
      <PollResult id={this.props.id}/>
    );
  }

  render() {
    return (
      <div className="poll-content">
        <h3>{this.props.question}</h3>
        {this.state.showResult ? this.renderPollResult() : this.renderPoll()}
      </div>
    );
  }
}