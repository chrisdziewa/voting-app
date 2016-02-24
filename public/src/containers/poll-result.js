import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoll } from '../actions/index';
import axios from 'axios';
import  Chart from 'chart.js'

class PollResult extends Component {
  constructor(props) {
    super(props);
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

  componentWillUpdate() {
    this.loadPoll();
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
        console.log(colors);
        console.log('value: ', choices[choice], ', label: ', choice);
        return {value: choices[choice], label: choice, color: colors[0], highlight: colors[1]};
      });
    }
    const ctx = document.getElementById("result-" + this.props.poll.id).getContext("2d");
    Chart.defaults.global.responsive = true;
    const myPieChart = new Chart(ctx).Pie(newData);
  }


  render() {
    let chartClass = this.props.poll.id;
    return (
      <div className="result-chart">
        <canvas id={"result-" + chartClass}></canvas>
      </div>
    );
    {this.loadPoll()}
  }
}

export default PollResult;
