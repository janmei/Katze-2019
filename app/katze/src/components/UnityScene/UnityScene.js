import React, { Component } from 'react';
import './UnityScene.css';
import Unity, { UnityContent } from 'react-unity-webgl';
import moment from 'moment';

// https://github.com/elraccoone/react-unity-webgl/wiki/Unity-Content
// SEND MESSAGES
// unityContent.send("SpawnController", "StartGame");

class UnityScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        head: '',
        sub: ''
      },
      countdown: '2019-07-06T19:34:16.578Z',
      countdown_active: false,
      animation: '',
      team_layer: {},
      loaded: false
    };

    this.unityContent = new UnityContent(
      '/Animation/TestSceneHD.json',
      '/Animation/UnityLoader.js',
    );
  }

  componentDidMount() {
    // Listener für Scene Switch
    this.unityContent.on("loaded", () => {

      // Now we can for example hide the loading overlay.
      console.log("loaded");

      if (this.state.animation === 'text') {
        if (this.state.countdown_active) {
          this.unityContent.send(
            'Communicator',
            'ChangeText',
            this.state.content.head + '|' + this.state.content.sub + '|' + 'false'
          )
        } else {
          this.unityContent.send(
            'Communicator',
            'ChangeText',
            this.state.content.head + '|' + this.state.content.sub + '|' + this.getDiff(this.state.countdown)
          )
        }
      }
    });
  }

  componentDidUpdate() {
    // this.getDiff(this.state.countdown)
    
  }
  componentWillReceiveProps(next) {

    console.log("data");
    
    this.setState({
      content: {
        head: next.data.content.head,
        sub: next.data.content.sub,
      },
      countdown: next.data.content.countdown,
      countdown_active: next.data.content.countdown_active,
      animation: next.data.animation,
      team_layer: next.data.team_layer
    });
    if (this.state.countdown_active) {
      // setCountdown(this.state.content.countdown);
    }
  }

  getDiff(time) {
    const current = moment()
    const target = moment(time).add(2, 'h')
    return target.diff(current)
  }

  render() {
    return (
      <Unity
        className="UnityAnimation"
        unityContent={this.unityContent}
        height="100%"
        width="100%"
      />
    );
  }
}

export default UnityScene;
