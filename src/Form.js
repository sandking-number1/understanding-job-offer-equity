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
          <Graph initialEmployeeShares={this.state.initialEmployeeShares} initialCompanyShares={this.state.initialCompanyShares} vestingPeriod={this.state.vestingPeriod} cliffPeriod={this.state.cliffPeriod}/>          <h1 id='title'>{this.allMessages[this.state.count]}</h1>
          <input onKeyUp={this.handleClick}></input>
        </div>
      );
    } else {
      return (
        <div>
          <div className="wrapper">
            <h1>Understanding Employee Equity</h1>
            <div className="pie-charts">
              <div className="pieID--micro-skills pie-chart--wrapper">
                <h2>After Cliff</h2>
                <div className="pie-chart">
                  <div className="pie-chart__pie"></div>
                  <ul className="pie-chart__legend">
                    <li><em>Rest of the Company</em><span>5000</span></li>
                    <li><em>Your shares</em><span>50</span></li>
                  </ul>
                </div>
              </div>
              <div className="pieID--categories pie-chart--wrapper">
                <h2>After Full Vest</h2>
                <div className="pie-chart">
                  <div className="pie-chart__pie"></div>
                  <ul className="pie-chart__legend">
                    <li><em>Rest of the Company</em><span>5000</span></li>
                    <li><em>Your Shares</em><span>200</span></li>
                  </ul>
                </div>
              </div>
              <div className="pieID--operations pie-chart--wrapper">
                <h2>More Likely Scenario</h2>
                <div className="pie-chart">
                  <div className="pie-chart__pie"></div>
                  <ul className="pie-chart__legend">
                    <li><em>Investors</em><span>486</span></li>
                    <li><em>Founders</em><span>156</span></li>
                    <li><em>Company Pool</em><span>315</span></li>
                    <li><em>Your share</em><span>43</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Graph initialEmployeeShares={this.state.initialEmployeeShares} initialCompanyShares={this.state.initialCompanyShares} vestingPeriod={this.state.vestingPeriod} cliffPeriod={this.state.cliffPeriod}/>
          <div>You will own {this.state.initialEmployeeShares/this.state.initialCompanyShares/this.state.vestingPeriod*100}% of the company after one year</div>
          <div>And it will take you the full vesting schedule of {this.state.vestingPeriod} years to own {this.state.initialEmployeeShares/this.state.initialCompanyShares*100}% of the company</div>
        </div>
      );
    }
  }
}
export default Form;