import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoll } from '../actions/index';
import axios from 'axios';
import  Chart from 'chart.js'

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
    if (newData.totalVotes === 0) {
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


    setTimeout(() => {
      const ctx = document.getElementById("result-" + this.props.poll.id).getContext("2d");
      Chart.defaults.global.responsive = true;
      const myPieChart = new Chart(ctx).Pie(newData);
    }, 40);
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
      </div>
    );
    {this.loadPoll()}
  }
}

export default PollResult;
