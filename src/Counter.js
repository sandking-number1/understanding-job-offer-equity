import React from 'react';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      initialShares: 0,
      currentInstruction: 'How many shares have you been issued?'
    };

    this.allMessages = [

    ];
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.setState({
        initialShares: e.target.value,
        currentInstruction: 'Great. Lets get money'
      });
      e.target.value = '';
    }

  }

  render() {
    return (
      <div>
        <h1 id='title'>Understand your equity as a new employee</h1>
        <input onKeyUp={this.handleClick}></input>
        <button></button>
        <div>{this.state.currentInstruction}</div>
      </div>
    );
  }
}
export default Counter;