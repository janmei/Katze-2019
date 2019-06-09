import React, { Component } from 'react';
import './Slide.css';
import Titelblob from '../../components/Titelblob/Titelblob';
import UnityScene from '../../components/UnityScene/UnityScene';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');
class Slide extends Component {
	constructor({ match }) {
		super();

		// SET THE SLIDE ID TO GLOBAL STATE
		this.state = {
			id: match.params.id,
			viewData: {}
		};

		this.updateContent = this.updateContent.bind(this);

		socket.on(match.params.id, payload => console.log(payload));
		// socket.on('get_data', payload => this.updateContent(payload));
	}

	componentDidMount() {
		socket.emit('initial_data', this.state.id);
	}

	componentWillUnmount() {
		// socket.off('get_data');
	}

	// function to call for socket handling
	updateContent(payload) {
		console.log('payload');

		this.setState({
			viewData: payload
		});
	}

	render() {
		socket.on('get_data', this.updateContent);
		return (
			<div className="Slide">
				<Titelblob data={this.state.viewData} />
				<UnityScene />
			</div>
		);
	}
}

export default Slide;
