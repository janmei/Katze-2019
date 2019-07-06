import React, { Component, Fragment } from 'react';
import './View.css';
import {
	Card,
	Box,
	Menu,
	MenuItem,
	Button,
	IconButton
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Axios from 'axios';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
	return (
		<span>
			{minutes}:{seconds}
		</span>
	);
};
class View extends Component {
	constructor() {
		super();

		this.state = {
			checked: false,
			anchorEl: null,
		};
	}

	handleChange = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked }, function() {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange({ id: this.props.item.id, checked: this.state.checked });
			}
		});
	};

	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	};

	handleClose = () => {
		this.setState({
			anchorEl: null
		});
	};

	handleDeleteScene = () => {
		Axios.delete('http://localhost:9000/views/' + this.props.item.id).then(res => {
			console.log(res);
			this.props.viewDeleted();
		});
	};

	render() {
		return (
			<Card className="card" m={2} width={1 / 4}>
					{this.props.item.animation === 'text' && (
				<CardContent>
					<Typography color="textSecondary">{this.props.item.name}</Typography>
					<Typography variant="h6" component="p">
						{this.props.item.content.head}
					</Typography>
					<Typography variant="subtitle1" component="p">
						{this.props.item.content.sub}
						</Typography>
				</CardContent>
				)}
				{this.props.item.animation === 'teams' && (
					<CardContent>
						<Typography color="textSecondary">{this.props.item.name}</Typography>
						<Typography variant="h6" component="p">
							{this.props.item.team_layer.name}
						</Typography>
						<Typography variant="subtitle1" component="p">
							{this.props.item.team_layer.persons.join(', ')}
						</Typography>
					</CardContent>
				)}
				{this.props.item.animation === 'countdown' && (
					<CardContent>
						<Typography color="textSecondary">{this.props.item.name}</Typography>
						<Typography variant="h6" component="p">
							Countdown
						</Typography>
							<Countdown 					
								date={this.props.item.countdown}
								renderer={renderer}
							/>
					</CardContent>
				)}
				<CardActions>
					<Box className="bottom">
						<Checkbox
							checked={this.state.checked}
							onChange={this.handleChange('checked')}
							value="checked"
							color="primary"
						/>
						<Typography variant="subtitle1" component="p" align="right">
							{this.props.item.animation}
						</Typography>
					</Box>
				</CardActions>
			</Card>
		);
	}
}

export default View;
