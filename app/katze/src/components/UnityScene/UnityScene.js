import React, { Component } from 'react';
import './UnityScene.css';
import Unity, { UnityContent } from 'react-unity-webgl';
import moment from 'moment';
import { getTrigger } from '../../global/socket';

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
      team_layer: {},
      loaded: false,
      isMain: false
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

      this.updateTexts(this.state)
      if (this.state.isMain && moment().isAfter(this.state.countdown)) {
        getTrigger((err, data) => {

          if (data === 'start') {
            this.unityContent.send(
              'Communicator',
              'StartTransitionToSlides'
            )
          } else if (data === 'end') {
            this.unityContent.send(
              'Communicator',
              'StartTransitionToSlides'
            )
          }
          })
      }

    });
  }

  updateTexts = (data)=>  {
    if (data.animation === 'text') {
      if (!data.countdown_active) {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.content.head + '|' + data.content.sub + '|' + '-1|' + data.animation 
        )
      } else {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.content.head + '|' + data.content.sub + '|' + this.getDiff(data.countdown) + '|'+data.animation
        )
      }
    } else if (data.animation === 'program') {
      if (!data.countdown_active) {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.content.head + '|' + data.content.sub + '|' + '-1|teams'
        )
      } else {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.content.head + '|' + data.content.sub + '|' + this.getDiff(data.countdown) + '|teams'
        )
      }
    }
    else if (data.animation === 'teams') {
      if (!data.countdown_active) {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.team_layer.name + '|' + data.team_layer.persons.join(' • ') + '|' + '-1|'+data.animation
        )
      } else {
        this.unityContent.send(
          'Communicator',
          'ChangeText',
          data.team_layer.name + '|' + data.team_layer.persons.join(' • ') + '|' + this.getDiff(data.countdown)+'|'+data.animation
        )
      }
    }else if (data.animation === 'sponsors' || data.animation === 'timetable') {
      this.unityContent.send(
        'Communicator',
        'ChangeText',
        "||-1|"+data.animation
      )
    }
  }

  componentDidUpdate() {
    // this.getDiff(this.state.countdown)
    this.updateTexts(this.state)
    console.log(this.state);
  }

  componentWillReceiveProps = (next) => {
    console.log(next);
    
    this.setState({
      content: {
        head: next.data.content.head,
        sub: next.data.content.sub,
      },
      countdown: next.data.countdown,
      countdown_active: next.data.countdown_active,
      animation: next.data.animation,
      team_layer: next.data.team_layer,
      isMain: next.data.isMain,
    });

    
  }

  getDiff(time) {
    const current = moment()
    const target = moment(time)
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
