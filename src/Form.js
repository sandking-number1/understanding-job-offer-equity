import React from 'react';
import Graph from './Graph.js';
import Tooltip from './Tooltip.js'
import $ from "jquery";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      initialEmployeeShares: 0,
      initialCompanyShares: 0,
      vestingPeriod: 0,
      cliffPeriod: 0,
      initialCompanyValuation: 0,
      lastFundingStage: 'None',
      yourLikelySharePercentage: 0,
      companyLikelyValue: 0
    };

    this.allMessages = [
      'How many shares have you been issued?',
      'Great. How many total outstanding shares are there in the company?',
      'Over how many years will your stocks vest?',
      'At how many months is your cliff? (Enter 12 for 1 year)',
      'What is the current company valuation?',
      'Finally, what was the last round that was raised?'
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
      } else if (this.state.count === 4) {
        this.setState({
          initialCompanyValuation: e.target.value,
          count: this.state.count+1
        })
      } else if (this.state.count === 5) {
        this.setState({
          lastFundingStage: e.target.value,
          count: this.state.count+1
        })
        this.createLikelyDistribution();
      }
      e.target.value = '';
    }
  }

  createLikelyDistribution() {
    const options = ['Seed', 'SeriesA', 'SeriesB', 'SeriesC'];
    const idx = options.indexOf(this.state.lastFundingStage);

    // this newAmountOfShares variable is an estimation. If your current company is at seed stage, you will get diluted 4X, if series C, then nothing.
    const newAmountOfCompanyShares = this.state.initialCompanyShares * (4-idx);
    const yourLikelySharePercentage = ((this.state.initialEmployeeShares / newAmountOfCompanyShares) * 100).toFixed(2);
    const companyLikelyValue = (4-idx) * 3 * this.state.initialCompanyValuation;
    this.setState({
      yourLikelySharePercentage: yourLikelySharePercentage,
      companyLikelyValue: companyLikelyValue
    })
  }


  render() {
    if (this.state.count < 5) {
      return (
        <div>
          <br /><h1>Understanding Employee Equity</h1><br />
          <h3>{this.allMessages[this.state.count]}</h3><br />
          <input type="number" onKeyUp={this.handleClick}></input>
        </div>
      );
    } else if (this.state.count === 5) {
      return (
        <div>
          <br /><h1>Understanding Employee Equity</h1><br />
          <h3>{this.allMessages[this.state.count]}</h3><br />
          <select onKeyUp={this.handleClick}>
            <option value="None">None</option>
            <option value="Seed">Seed</option>
            <option value="SeriesA">Series A</option>
            <option value="SeriesB">Series B</option>
            <option value="SeriesC">Series C</option>
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Understanding Employee Equity</h1>
          <Graph initialEmployeeShares={this.state.initialEmployeeShares} initialCompanyShares={this.state.initialCompanyShares} vestingPeriod={this.state.vestingPeriod} cliffPeriod={this.state.cliffPeriod} lastFundingStage={this.state.lastFundingStage} yourLikelySharePercentage={this.state.yourLikelySharePercentage}/>
          <div>You will own {(((this.state.initialEmployeeShares/this.state.vestingPeriod*(this.state.cliffPeriod/12))/this.state.initialCompanyShares)*100).toFixed(2)}% after {(this.state.cliffPeriod/12).toFixed(1)} years (nothing before then), with a dollar value of ${Math.round((this.state.initialEmployeeShares/this.state.vestingPeriod*(this.state.cliffPeriod/12))/this.state.initialCompanyShares*this.state.initialCompanyValuation).toLocaleString()
}.</div>
          <br/>

          <div >It will take you the full vesting schedule of {this.state.vestingPeriod} years to own {(this.state.initialEmployeeShares/this.state.initialCompanyShares*100).toFixed(2)}% of the company, which has a value of ${Math.round(this.state.initialEmployeeShares/this.state.initialCompanyShares*this.state.initialCompanyValuation).toLocaleString()}</div><br />
          <div className="placement">
            <div>However, after {this.state.vestingPeriod} years (and further rounds of investment), the more likely outcome is that your ownership will be diluted to ~ {this.state.yourLikelySharePercentage}%; but would have a value of ${(this.state.yourLikelySharePercentage/100*this.state.companyLikelyValue).toLocaleString()}. </div>
            <Tooltip />
          </div>
        </div>
      );
    }
  }
}
export default Form;