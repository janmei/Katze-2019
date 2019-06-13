import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
	constructor() {
		super();
		this.state = {
			endpoint: 'http://localhost:3001/' // Update 3001 with port on which backend-my-app/server.js is running.
		};
	}

	render() {
		return null;
	}
}

export { Header, socket };
