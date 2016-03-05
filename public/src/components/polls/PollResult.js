import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import { Link } from 'react-router';
Chart.defaults.global.responsive = true;

class PollResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legendData: []
    }
  }

  componentDidMount() {
    this.loadPoll();
  }

  randomColor() {
    let hexList = '0123456789ABCDEF';
    let color = "#";
    let highlight = "#";
    for (let i = 0; i < 6; i++) {
      let num = Math.floor(Math.random() * 15);
      if (num + 2 > 15) {
        num -= 2;
      }
      color += hexList[num];
      highlight += hexList[num + 2];
    }
    return [color, highlight];
  }

  loadPoll() {

    let newData = this.props.poll;

    console.log('newData', newData);
    if (!newData || newData.totalVotes == 0) {
      newData = [{value: 1, label: 'No votes yet', color: '#cccccc', highlight: '#eeeeee' }];
    }

    else {
      let choices = newData.choices;
      newData = Object.keys(choices).map(choice => {
      // random color each time rendered
        let colors = this.randomColor();
        return {value: choices[choice], label: choice, color: colors[0], highlight: colors[1]};
      });
    }

    this.setState({
      legendData: newData
    });

    const ctx = document.getElementById("result-" + this.props.poll.id).getContext("2d");
    const myPieChart = new Chart(ctx).Pie(newData);
  }

  tweetPoll() {
    let { author, question } = this.props.poll;
    let link = encodeURIComponent(`https://sondage-me.herokuapp.com/users/${author}/${question}`);
    window.open(`https://twitter.com/share?url="${link}"&text=${question} ${link}&menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600`);
    return false;
  }

  renderLegend() {
    if (!this.state.legendData || this.state.legendData.length === 0) {
      return null;
    }

    let legend = this.state.legendData.map(pollItem => {
      let itemStyle = {
        background: pollItem.color,
      };
      return (
        <li
          className="legend-item"
          key={pollItem.label}>
          <div
            className="legend-color"
            style={itemStyle}
          >
          </div>
          <div className="legend-label">
            {pollItem.label}
          </div>
        </li>
      );
    });

    return legend;
  }

  render() {
    let chartClass = this.props.poll.id;
    return (
      <div className="result-chart">
        <canvas id={"result-" + chartClass}></canvas>
        <div className="poll-legend-container">
          <ul className="poll-legend">
            {this.renderLegend()}
          </ul>
        </div>
        <div className="poll-footer">
          <div className="author-info">
            <span>Poll by: </span>
            <Link
              to={`/users/${this.props.poll.author}`}
              className="poll-author"
            >
              {this.props.poll.author}
            </Link>
          </div>
          <button
            onClick={this.tweetPoll.bind(this)}
            className="twitter btn btn-primary"
          >
            Share on Twitter
          </button>
        </div>
      </div>
    );
    {this.loadPoll()}
  }
}

export default PollResult;
