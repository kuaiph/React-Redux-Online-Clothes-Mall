import React, { Component } from 'react';


class Clock extends Component{
  // If you want to use this in constructor, you have to write as below:
  // constructor(props) {
  //     super(props);
  //     this.state = { date: new Date() };
  // }

  // But basically, we just use 'property initializer' in react
  state = {
    date: new Date(),
  }
  tick() {
      this.setState({ date: new Date() });
  }
  componentDidMount(){
      // 装载定时器
      this.timerID = setInterval( () => this.tick(), 1000 );
  }
  componentWillUnmount(){
      // 卸载定时器
      clearInterval(this.timerID);
  }

  render(){
      return <h1>{ this.state.date.toString('yyyy-MM-dd HH:mm:ss') }</h1>;
  } 
}

export default Clock;