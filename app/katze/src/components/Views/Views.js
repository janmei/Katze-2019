import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

import './Views.css';
import axios from 'axios';
import qs from 'qs';
import View from '../View/View';
import { Typography, Icon, TextField } from '@material-ui/core';

class Views extends Component {
	constructor() {
		super();

		this.state = {
			selectedViews: [],
			add_scene: false,
			newScene: ''
		};
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleSelectedViews = e => {
		if (e.checked) {
			this.setState(
				state => {
					const selectedViews = state.selectedViews.concat(e);
					return {
						selectedViews
					};
				},
				function() {
					if (typeof this.props.onChange === 'function') {
						this.props.onChange(this.state.selectedViews);
					}
				}
			);
		} else {
			this.setState(
				state => {
					const selectedViews = state.selectedViews.filter(
						(item, j) => e.id !== item.id
					);
					return {
						selectedViews
					};
				},
				function() {
					if (typeof this.props.onChange === 'function') {
						this.props.onChange(this.state.selectedViews);
					}
				}
			);
		}
	};

	renderViews() {
		if (this.props.views != null) {
			return this.props.views.map((item, i) => {
				return (
					<View
						item={item}
						onChange={this.handleSelectedViews}
						key={item.id}
					/>
				);
			});
		} else {
			return;
		}
	}

	handleAddScene = () => {
		this.setState({
			add_scene: true
		});
	};

	handleKeyPress = event => {
		var view = qs.stringify(
			{
				name: event.target.value
			},
			{ allowDots: true }
		);

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		if (event.key === 'Enter') {
			axios
				.post('http://localhost:9000/views/', view, config)
				.then(res => {
					this.props.viewAdded();
					console.log(this.state.views);
				})
				.catch(function(err) {
					console.log(err);
				});
			this.setState({
				add_scene: false
			});
		}
	};

	render() {
		return (
			<div>
				<Box display="flex" width="calc(100% - 400px)" flexWrap="wrap">
					{this.renderViews()}

					<Box
						display="flex"
						className="addView"
						justifyContent="center"
						alignItems="center"
					>
						{!this.state.add_scene && (
							<Box
								display="flex"
								justifyContent="center"
								flexDirection="column"
								alignItems="center"
								onClick={this.handleAddScene}
							>
								<Typography>Szene hinzufügen</Typography>
								<Icon color="primary">add_circle</Icon>
							</Box>
						)}
						{this.state.add_scene && (
							<Box
								display="flex"
								justifyContent="center"
								flexDirection="column"
								alignItems="center"
								onClick={this.handleAddScene}
							>
								<Typography>Szene benennen</Typography>
								<TextField
									id="outlined-name"
									label="Untertitel"
									value={this.state.newScene}
									onChange={this.handleChange('newScene')}
									onKeyPress={this.handleKeyPress}
									margin="normal"
									variant="outlined"
									fullWidth
								/>
							</Box>
						)}
					</Box>
				</Box>
			</div>
		);
	}
}

export default Views;
