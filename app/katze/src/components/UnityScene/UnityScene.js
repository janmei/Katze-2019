import React, { Component } from 'react';
import './UnityScene.css';
import Unity, { UnityContent } from 'react-unity-webgl';

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
      countdown: '',
      countdown_active: false,
      animation: '',
      team_layer: {}
    };

    this.unityContent = new UnityContent(
      '/Animation/TestSceneHD.json',
      '/Animation/UnityLoader.js',
    );
  }

  componentDidMount() {
    // Listener für Scene Switch
  }

  componentWillReceiveProps(next) {
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

    if (this.state.animation === 'text') {
      this.unityContent.send(
        "Communicator",
        "ChangeText",
        "test",
        "asd",
        1000000000
      )
    }
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
