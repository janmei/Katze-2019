import React, { Component } from 'react';
import './Titelblob.css';
import axios from 'axios';

class Titelblob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        head: "",
        sub: "",
        countdown: ""
      },
      animation: "",
      team_layer: {},
    }
  }

  componentWillReceiveProps(next) {
    this.setState({
      content: {
        head: next.data.content.head,
        sub: next.data.content.sub,
        countdown: next.data.content.countdown
      },
      animation: next.data.animation,
      team_layer: next.data.team_layer
    })
  }

  render() {
    return (
      <div className="InfoLayer">
        <h1>{this.state.content.head}</h1>
        <svg id="blob" width="100%" height="100%" fill="none">
          <path fill="#FFFFFF">
            <animate
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="20s"
              values="M376.5,70.1 C393.7,115.2 357.5,179.4 332.8,229.5 C308,279.6 294.7,315.6 266.5,334.5 C238.2,353.3 195.1,355.1 143.6,342.6 C92.1,330 32.2,303 10.1,253.8 C-12,204.6 3.7,133.1 44.7,82.6 C85.6,32.1 151.8,2.5 220.2,0.8 C288.6,-1 359.3,25 376.5,70.1 Z; M355.9,17.6 C372,45.9 326.7,115 308,187.3 C289.3,259.6 297,335.1 268.5,357.3 C240,379.4 175.2,348.2 118,315.2 C60.8,282.3 11.3,247.6 1.8,204.3 C-7.6,161.1 23,109.2 60.2,76 C97.4,42.8 141.2,28.4 201.8,15 C262.4,1.6 339.8,-10.8 355.9,17.6 Z; M347.5,122.8 C380.3,169.6 413.1,210.8 415.3,262.5 C417.5,314.1 389,376.3 348.9,384 C308.7,391.7 257,344.8 190.9,317.1 C124.9,289.3 44.6,280.7 14.4,235.6 C-15.8,190.5 4,108.9 51.4,58.8 C98.9,8.6 173.9,-10.2 227.9,6.6 C281.8,23.5 314.7,76 347.5,122.8 Z; M376.5,70.1 C393.7,115.2 357.5,179.4 332.8,229.5 C308,279.6 294.7,315.6 266.5,334.5 C238.2,353.3 195.1,355.1 143.6,342.6 C92.1,330 32.2,303 10.1,253.8 C-12,204.6 3.7,133.1 44.7,82.6 C85.6,32.1 151.8,2.5 220.2,0.8 C288.6,-1 359.3,25 376.5,70.1 Z;"
            />
          </path>
        </svg>
      </div>
    );
  }
}

export default Titelblob;
