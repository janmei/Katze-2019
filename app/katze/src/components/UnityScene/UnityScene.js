import React, { Component } from 'react';
import './UnityScene.css';
import Unity, { UnityContent } from 'react-unity-webgl';

// https://github.com/elraccoone/react-unity-webgl/wiki/Unity-Content
// SEND MESSAGES
// unityContent.send("SpawnController", "StartGame");

class UnityScene extends Component {
  constructor(props) {
    super(props);

    this.unityContent = new UnityContent(
      '/Animation/TestSceneHD.json',
      '/Animation/UnityLoader.js',
    );
  }

  componentDidMount() {
    // Listener für Scene Switch
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
