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

class View extends Component {
	constructor() {
		super();

		this.state = {
			checked: false,
			anchorEl: null
		};
	}

	handleChange = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked }, function() {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange({ id: this.props.id, checked: this.state.checked });
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
		Axios.delete('http://localhost:9000/views/' + this.props.id).then(res => {
			console.log(res);
			this.props.viewDeleted();
		});
	};

	render() {
		return (
			<Card className="card" m={2} width={1 / 4}>
				<CardContent>
					{/* <Box>
						<Fragment>
							<IconButton
								aria-controls="simple-menu"
								aria-haspopup="true"
								onClick={this.handleClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={this.state.anchorEl}
								keepMounted
								open={Boolean(this.state.anchorEl)}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.handleDeleteScene}>
									Szene löschen
								</MenuItem>
							</Menu>
						</Fragment>
					</Box> */}
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
							color="primary"
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
