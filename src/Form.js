import React from 'react';
import Graph from './Graph.js';
import $ from "jquery";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      initialEmployeeShares: 0,
      initialCompanyShares: 0,
      vestingPeriod: 0,
      cliffPeriod: 0
    };

    this.allMessages = [
      'How many shares have you been issued?',
      'Great. How many total outstanding shares are there in the company?',
      'Over how many years will your stocks vest?',
      'Finally, at how many months is your cliff? (Enter 12 for 1 year)'
    ];
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log($('.pieID--micro-skills .pie-chart__legend span'))
  }

  handleClick(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (this.state.count === 0) {
        this.setState({
          initialEmployeeShares: e.target.value,
          count: this.state.count+1
        });
      } else if (this.state.count === 1) {
        this.setState({
          initialCompanyShares: e.target.value,
          count: this.state.count+1
        })
      } else if (this.state.count === 2) {
        this.setState({
          vestingPeriod: e.target.value,
          count: this.state.count+1
        })
      } else if (this.state.count === 3) {
        this.setState({
          cliffPeriod: e.target.value,
          count: this.state.count+1
        })
      }
      e.target.value = '';
    }
  }


  render() {
    if (this.state.count < 4) {
      return (
        <div>
          <Graph />
          <h1 id='title'>Understand your equity as a new employee</h1>
          <input onKeyUp={this.handleClick}></input>
          <button></button>
          <div>{this.allMessages[this.state.count]}</div>
        </div>
      );
    } else {
      return (
        <div>
          <Graph />
          <div>You will own {this.state.initialEmployeeShares/this.state.initialCompanyShares/this.state.vestingPeriod*100}% of the company after one year</div>
          <div>And it will take you the full vesting schedule of {this.state.vestingPeriod} years to own {this.state.initialEmployeeShares/this.state.initialCompanyShares*100}% of the company</div>
        </div>
      );
    }
  }
}
export default Form;