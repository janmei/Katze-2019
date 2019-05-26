import React, { Component } from 'react';
import './Slide.css';
import axios from 'axios';

class Slide extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/views/'+this.state.id).then(res => {
      // this.setState({
      //   semesters: res.data
      // })
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    return <div className="Slide">Slide View: {this.state.id}</div>;
  }
}

export default Slide;
