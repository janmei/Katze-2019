import React, { Component } from 'react';
import './Countdown.css';
import moment from 'moment';
import { TextField, Box } from '@material-ui/core';

class Countdown extends Component {
	constructor() {
		super();

		this.state = {
			countdown: new Date()
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = name => event => {
		var time = event.target.value;
		var timeArray = time.split(':');

		var now = new Date();
		var endMinutes = moment(now).add(timeArray[0], 'minutes');
		var endTime = moment(endMinutes)
			.add(timeArray[1], 'seconds')
			.toDate();

		this.setState({ ...this.state, [name]: endTime });

		this.props.getTargetTime(endTime);
	};

	render() {
		return (
			<Box m={2} display="flex">
				<TextField
					id="time"
					label="Dauer"
					type="time"
					defaultValue="00:00"
					className="countdownInput"
					InputLabelProps={{
						shrink: true
					}}
					inputProps={{
						step: 60 // 5 min
					}}
					onChange={this.handleChange('countdown')}
				/>
			</Box>
		);
	}
}

export default Countdown;
