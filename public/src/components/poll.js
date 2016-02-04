import React, { Component } from 'react';
import PollChoice from './poll-choice';
import PollResult from '../containers/poll-result';
import { connect} from 'react-redux';
import { updateVotes } from '../actions/index';

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      showResult: false,
      currentChoice: ''
     };
  } 

  handleChecked(choice) {
    this.setState({
      currentChoice: choice
    });
  }

  renderPollChoices() {
    if (typeof this.props.choices === 'undefined') {
      return null;
    }
    return this.props.choices.map(choice => {
      return <li key={choice}>
        <PollChoice 
          checkOption={this.handleChecked.bind(this)} 
          disabled={true} 
          choice={choice} 
          currentChoice={this.state.currentChoice}
        />
      </li>
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.state.currentChoice;
    if (!data || !data.length > 0) {
      return false;
    }
    this.props.updateVotes(this.props.id, data) 
      .then(() => {
        this.setState({
          showResult: true
        });
      }); 
  }

  renderPoll() {
    return (
      <ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.renderPollChoices()}
          <PollChoice 
            disabled={false} 
            checkOption={this.handleChecked.bind(this)} 
            currentChoice={this.state.currentChoice}
          />
          <div className="input-form-group">
            <button 
              className="btn btn-primary form-control" 
            >
              Vote
            </button>
          </div>
        </form>
      </ul>
    );
  }

  renderPollResult() {
    // When clicked, change state to showResult and only show result
    return (
      <PollResult id={this.props.id} />
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

export default connect(null, { updateVotes })(Poll);





