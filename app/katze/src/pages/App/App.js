import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Admin from '../Admin/Admin';
import Slide from '../Slide/Slide';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Admin} />
          <Route path="/slide/:id" component={Slide} />
        </div>
      </Router>
    );
  }
}

export default App;