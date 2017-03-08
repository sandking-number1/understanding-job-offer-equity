import React from 'react';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      initialEmployeeShares: 0,
      initialCompanyShares: 0,
      cliffPeriod: 0
    };

    this.allMessages = [
      'How many shares have you been issued?',
      'Great. How many total outstanding shares are there in the company?',
      'At how many months is your cliff? (Enter 12 for 1 year)'

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
          cliffPeriod: e.target.value,
          count: this.state.count+1
        })
      }
      e.target.value = '';
    }
    console.log('ok so here is state: ', this.state)
  }

  render() {
    return (
      <div>
        <h1 id='title'>Understand your equity as a new employee</h1>
        <input onKeyUp={this.handleClick}></input>
        <button></button>
        <div>{this.allMessages[this.state.count]}</div>
      </div>
    );
  }
}
export default Counter;