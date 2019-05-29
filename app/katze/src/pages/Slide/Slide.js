import React, { Component } from 'react';
import './Slide.css';
import axios from 'axios';
import Titelblob from '../../components/Titelblob/Titelblob';
import UnityScene from '../../components/UnityScene/UnityScene';

class Slide extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
      viewData: {}
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/views/' + this.state.id)
      .then(res => {
        console.log(res.data);

        this.setState({
          viewData: res.data
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // function to call for socket handling
  updateContent = () => {
    axios
      .get('http://localhost:9000/views/' + this.state.id)
      .then(res => {
        console.log(res.data);

        this.setState({
          viewData: res.data
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Slide">
        <Titelblob data={this.state.viewData} />
        <UnityScene />
      </div>
    );
  }
}

export default Slide;
