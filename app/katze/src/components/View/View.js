import React, { Component } from 'react';
import './View.css';
import { Card, Box } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

class View extends Component {
	constructor() {
		super();

		this.state = {
			checked: false
		};
	}

	handleChange = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked }, function() {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange({ id: this.props.id, checked: this.state.checked });
			}
		});
	};

	render() {
		return (
			<Card className="card" m={2} width={1 / 4}>
				<CardContent>
					<Typography color="textSecondary">{this.props.name}</Typography>
					<Typography variant="h6" component="p">
						{this.props.title}
					</Typography>
					<Typography variant="subtitle1" component="p">
						{this.props.sub}
					</Typography>
				</CardContent>
				<CardActions>
					<Box className="bottom">
						<Checkbox
							checked={this.state.checked}
							onChange={this.handleChange('checked')}
							value="checked"
						/>
						<Typography variant="subtitle1" component="p" align="right">
							{this.props.animation}
						</Typography>
					</Box>
				</CardActions>
			</Card>
		);
	}
}

export default View;
