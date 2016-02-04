import React, { Component } from 'react';

export default class PollChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {text: ''};
  }
  componentWillMount() {
    if (this.props.choice) {
      this.setState({
        text: this.props.choice
      });
    }
  }

  handleChoiceUpdate(e) {
    this.setState({
      text: e.target.value
    }, () => {
       this.props.checkOption(this.state.text);
    });
  }

  selectChoice(e) {
    this.props.checkOption(e.target.value);
  }

  render() {
    return (
      <div className="input-group poll-choice">
        <span className="input-group-addon">
          <input type="radio" 
            onClick={this.selectChoice.bind(this)}
            checked={ this.props.currentChoice === this.state.text ? true : false }
            aria-label={"Choose: " + this.props.choice} 
            value={this.state.text} 
            name="choice" 
          />
        </span>
        <input type="text" 
          className="form-control choice-text" 
          value={this.state.text} 
          onClick={this.handleChoiceUpdate.bind(this)}
          aria-label={"Label for: " + this.props.choice}       
          disabled={this.props.disabled ? 'disabled' : '' }
          placeholder="Create your own choice"
          onChange={this.handleChoiceUpdate.bind(this)}
        />
      </div>
    );
  }
}