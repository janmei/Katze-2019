import React, { Component } from 'react';
import './Slide.css';
import Titelblob from '../../components/Titelblob/Titelblob';
import UnityScene from '../../components/UnityScene/UnityScene';
import { initalData, getData } from '../../global/socket';
import Tone from 'tone';
class Slide extends Component {
	constructor({ match }) {
		super();

		// SET THE SLIDE ID TO GLOBAL STATE
		this.state = {
			id: match.params.id,
			viewData: {}
		};

		this.updateContent = this.updateContent.bind(this);

		// socket.on(match.params.id, payload => console.log(payload));
		// socket.on('get_data', payload => this.updateContent(payload));
	}

	componentDidMount() {
		initalData(this.state.id);
		getData((err, data) => {
			if (data.name === this.state.id) {
				this.updateContent(data);
			}
		});
	}

	// function to call for socket handling
	updateContent(payload) {
		this.setState({
			viewData: payload
		});
	}
	render() {
		return (
			<div className="Slide">
				<Titelblob data={this.state.viewData} />
				<UnityScene data={this.state.viewData}/>
			</div>
		);
	}
}

export default Slide;
