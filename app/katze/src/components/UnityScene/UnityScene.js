import React, { Component } from 'react';
import './UnityScene.css';
import Unity, { UnityContent } from 'react-unity-webgl';

import axios from 'axios';

// https://github.com/elraccoone/react-unity-webgl/wiki/Unity-Content
// SEND MESSAGES
// unityContent.send("SpawnController", "StartGame");

class UnityScene extends Component {
  constructor() {
    this.unityContent = new UnityContent(
      'UnityBuild/Build.json',
      'UnityBuild/UnityLoader.js',
    );
  }

  render() {
    return (
      <div>
        <Unity unityContent={this.unityContent} />
      </div>
    );
  }
}

export default UnityScene;
