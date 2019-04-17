import React, { Component } from 'react';
import './Slide.css';

class Slide extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
    };
  }
  render() {
    return <div className="Slide">Slide View: {this.state.id}</div>;
  }
}

export default Slide;
