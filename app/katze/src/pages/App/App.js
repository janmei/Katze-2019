import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Slide from '../Slide/Slide';
import TeamDetail from '../TeamDetail/TeamDetail';
import { Header } from '../../global/header';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={Admin} />
					<Route path="/slide/:id" component={Slide} />
					<Route path="/team/:id" component={TeamDetail} />
				</div>
			</Router>
		);
	}
}

export default App;
