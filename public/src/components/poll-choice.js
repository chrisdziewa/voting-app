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
    });
  }

  render() {
    return (
      <div className="input-group poll-choice">
        <span className="input-group-addon">
          <input type="radio" aria-label={"Choose: " + this.props.choice} value={this.props.choice} name="choice"/>
        </span>
        <input type="text" 
          className="form-control choice-text" 
          value={this.props.choice} 
          aria-label={"Label for: " + this.props.choice}       
          disabled={this.props.disabled ? 'disabled' : '' }
          placeholder="Create your own choice"
          onChange={this.handleChoiceUpdate.bind(this)}
        />
      </div>
    );
  }
}