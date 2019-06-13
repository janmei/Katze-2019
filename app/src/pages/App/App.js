import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Slide from '../Slide/Slide';
import TeamDetail from '../TeamDetail/TeamDetail';
import Teams from '../Teams/Teams';

class App extends Component {
  render() {
    const App = () => (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Admin} /> */}
          {/* <Route path="/slide/:id" component={Slide} /> */}
          <Route path="/team/:id" component={TeamDetail} />
          <Route path="/teams" component={Teams} />
        </Switch>
      </div>
    );
    return (
      <Router>
        <Switch>
          <App />
        </Switch>
      </Router>
    );
  }
}

export default App;
