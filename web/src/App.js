import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './App.css';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: 'ap1',
  forceTLS: true,
});

class App extends Component {
  state = { heartRate: 'unknown' };

  async componentDidMount() {
    const { data } = await axios.get('https://l2qay1y8v5.execute-api.us-east-1.amazonaws.com/dev/heartrate');
    this.setState({ heartRate: data.heartRate });
    this.channel = pusher.subscribe('monitor');
    this.channel.bind('heartrate', (evt) => {
      this.setState({ heartRate: evt.data });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Asclepius</h1>
        </header>
        <p className="App-intro">
          BPM: {this.state.heartRate}
        </p>
      </div>
    );
  }
}

export default App;
