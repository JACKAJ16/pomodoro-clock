import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isStarted: false,
      time: 1500,
      do: "Session",
      start: "start"
    }
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleClickBreakIncrement = this.handleClickBreakIncrement.bind(this);
    this.handleClickBreakDecrement = this.handleClickBreakDecrement.bind(this);
    this.handleClickSessionIncrement = this.handleClickSessionIncrement.bind(this);
    this.handleClickSessionDecrement = this.handleClickSessionDecrement.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.clock = this.clock.bind(this);

  }
  
  handleClickBreakIncrement() {
    if (this.state.breakLength === 60) {
      this.setState ({
      breakLength: 60
    })
    } else {
    this.setState (state => ({
      breakLength: state.breakLength + 1
    }))
    }
  }
  
  handleClickBreakDecrement() {
    if(this.state.breakLength === 1) {
      this.setState ({
      breakLength: 1
    })
    } else {
    this.setState (state => ({
      breakLength: state.breakLength - 1
    }))
    }
  }
  
  handleClickSessionIncrement() {
    if(this.state.sessionLength === 60) {
      this.setState({
        sessionLength: 60
      })
    } else {
    this.setState (state => ({
      sessionLength: state.sessionLength + 1,
      time: state.time + 60

    }))
    }
  }
  
  
  
  handleClickSessionDecrement() {
    if(this.state.sessionLength === 1) {
      this.setState ({
      sessionLength: 1
    })
    } else {
      this.setState (state => ({
      sessionLength: state.sessionLength - 1,
      time: state.time - 60
    }))
    }
  }

  handleClickStart() {
    if(this.state.isStarted === false) {
    this.timerID = setInterval(() => this.tick(), 1000);
      this.setState({
        isStarted: true,
        start: "pause"
      })
    } else {
        clearInterval(this.timerID)
      this.setState({
        isStarted: false,
        start: "start"
      })
     }
  }
 handleClickReset() {
   if(this.state.isStarted === true) {
   clearInterval(this.timerID)
   document.getElementById("beep").pause();
   document.getElementById("beep").currentTime = 0;  
     this.setState ({
      breakLength: 5,
      sessionLength: 25,
      time: 1500,
      do: "Session",
      isStarted: false,
      start: "start"
    })
   } else {
   document.getElementById("beep").pause();
   document.getElementById("beep").currentTime = 0;

   
    this.setState ({
      breakLength: 5,
      sessionLength: 25,
      time: 1500,
      do: "Session",
      isStarted: false
    })
   }
 }
  
  tick() {
    if(this.state.time === 0 && this.state.do ==="Session") {
      document.getElementById("beep").play()
      this.setState(state =>({
        time: state.breakLength * 60,
        do: "Break"
       }))
    } else if(this.state.time === 0 && this.state.do ==="Break") {
      document.getElementById("beep").play()
      this.setState(state => ({
      time: state.sessionLength * 60,
      do: "Session"
      }))
    }else if(this.state.time !== 0) {
     this.setState (state => ({
      time: state.time - 1
        
    }))     
  }}
  
  clock() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  
  
  render() {
    return(
      <div>
        <div id="main">
          <div id="header">
            <h1>
              Pomodoro Clock
            </h1>
          </div>
          <div id="break-label">Break Length</div>
          <div id="session-label">Session Length</div>
          <div id="button-div">
            <button id="break-decrement" className="button" onClick={this.handleClickBreakDecrement}>-</button>
            <div id="break-length">{this.state.breakLength}</div>
            <button id="break-increment" className="button"  onClick={this.handleClickBreakIncrement}>+</button>
          </div>
          <div id="button-div">
            <button id="session-decrement" className="button"  onClick={this.handleClickSessionDecrement}>-</button>
            <div id="session-length">{this.state.sessionLength}</div>
            <button id="session-increment" className="button"  onClick={this.handleClickSessionIncrement}>+</button>
          </div>
          <div id="timer-div">
            <h2 id="timer-label">{this.state.do}</h2>
            <div id="time-left">{this.clock()}</div>
          </div>
          <div id="buttons">
            <button id="start_stop" className="button button-big" onClick={this.handleClickStart}>{this.state.start}</button>
            <button id="reset" className="button button-big" onClick={this.handleClickReset}>reset</button>
            <audio src="https://goo.gl/65cBl1" id="beep" preload="auto"> </audio>
          </div> 
        </div>
      </div>
    )
  }
}

export default App;
