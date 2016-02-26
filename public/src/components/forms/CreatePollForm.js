import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../../actions/index';

class CreatePollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      choices: [
        {
          id: 0,
          value: ''
        },
        {
          id: 1,
          value: ''
        },
      ],
      nextId: 2,
      errors: {}
    }
  }

  validate(question, choices) {
    let errors = {};
    let errorCount = 0
    if (question.trim().length < 6 || question.trim().length > 250) {
      errors.question = 'Question must be between 6 and 250 characters long';
      errorCount++;
    }

    if (choices.length < 2) {
      errors.choices = 'Must have at least 2 choices';
      errorCount++;
    }


    console.log(errors);
    this.setState({
      errors: errors
    });
    return errorCount === 0;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let question = this.state.question;
    let choices = this.state.choices.map(choice => {
      return choice.value.trim();
    });
    let filteredChoices = choices.filter(choice => {
      return choice.length > 0;
    });

    if (!this.validate(question, filteredChoices)) {
      return false;
    }

    else {
      let newPoll = {
        question: question,
        choices: filteredChoices
      }
      this.props.createPoll(newPoll);
    }
  }

  handleQuestionUpdate(e) {
    e.preventDefault();
    this.setState({
      question: e.target.value
    });
  }

  addChoice(e) {
    e.preventDefault();
    let choices = [...this.state.choices];
    let nextId = this.state.nextId;
    choices.push({
      id: nextId,
      value: ''
    });

    this.setState({
      choices: choices,
      nextId: nextId + 1
    });
  }

  handleChoiceUpdate(e) {
    e.preventDefault();
    let choices = [...this.state.choices];
    let updatedChoices = choices.map(choice => {
      let updated = choice;
      if (choice.id == parseInt(e.target.id)) {
        updated.value = e.target.value;
      }
      return updated;
    });

    this.setState({
      choices: updatedChoices
    });
  }

  buildChoice(item) {
    return (
      <input type="text"
        name="choice"
        onChange={this.handleChoiceUpdate.bind(this)}
        id={item.id}
        key={'choice-' + item.id}
        value={item.value}
        className="form-control"
      />
    );
  }

  renderChoices() {
    let choiceInputs = this.state.choices.map(choice => {
      return this.buildChoice(choice);
    });

    return choiceInputs;
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }
    return (
      <div className="new-poll-page">
        <div className="form-container">
          <h3>Create a new Poll</h3>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="question">Poll Title</label>
              <input
                onChange={this.handleQuestionUpdate.bind(this)}
                type="text"
                id="question"
                name="question"
                className="form-control"
                value={this.state.question}
              />
              <div className="text-help text-danger">
                  { this.state.errors.question ? this.state.errors.question : ''}
              </div>
            </div>

            <label>Poll Choices</label>
            <div className="form-group">
              { this.renderChoices() }

              <button
                onClick={this.addChoice.bind(this)}
                className="btn btn-success btn-add-choice">
                <i className="plus-sign">+</i>
              </button>
              <div className="text-help text-danger">
                  { this.state.errors.choices ? this.state.errors.choices : ''}
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Create Poll</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading
  }
}

export default connect(mapStateToProps, { createPoll })(CreatePollForm);
