import React, { Component } from 'react';
import './Admin.css';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import qs from 'qs';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Views from '../../components/Views/Views';

class Admin extends Component {
  constructor() {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      menu: false,
      template: '',
      semesters: [],
      selectedSemester: {},
      teams: [],
      selectedTeam: {},
      views: []
    };
  }


  componentDidMount() {
    axios.get('http://localhost:9000/semesters/').then(res => {
      this.setState({
        semesters: res.data
      })
    }).catch(function (err) {
      console.log(err);
    })

    axios.get('http://localhost:9000/views/').then(res => {
      this.setState({
        views: res.data
      })
      console.log(this.state.views);


    }).catch(function (err) {
      console.log(err);
    })
  }

  toggleDrawer = open => () => {
    this.setState({
      menu: open,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSelectChange = name => event => {
    this.setState({
      [name]: event.target.value,
      teams: event.target.value.teams
    });
    
  };

  renderNames() {
    if (this.state.semesters != null) {
      return this.state.semesters.map((item, i) => {
        return (
          <MenuItem value={item}>{item.year}</MenuItem>
          )
      })
    } else {
      return;
    }
  }

  renderTeams() {
    if (this.state.teams != null) {
      return this.state.teams.map((item, i) => {
        return (
          <MenuItem value={item.name}>{item.name}</MenuItem>
        )
      })
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="Admin">
        <AppBar position="static">
          <Toolbar className="topbar">
            <Typography variant="h6" color="inherit">
              KATZE - Überkontrollzentrum
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Views views={this.state.views}></Views>
        <SwipeableDrawer
          id="sideMenu"
          anchor="right"
          open={this.state.menu}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div className="menuWidth">
            
            <Typography component="h2" variant="h5" gutterBottom>
              Template
            </Typography>
            <FormControl className="menuForm" variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Template</InputLabel>
              <Select
                value={this.state.template}
                onChange={this.handleChange('template')}
                input={
                  <OutlinedInput name="template" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Teams</MenuItem>
                <MenuItem value={2}>Zeitplan</MenuItem>
                <MenuItem value={3}>Countdown</MenuItem>
              </Select>
            </FormControl>
            <Divider />
            <Typography component="h2" variant="h5" gutterBottom>
              Animation
            </Typography>
            <FormControl className="menuForm" variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Semester</InputLabel>
              <Select
                value={this.state.selectedSemester}
                onChange={this.handleSelectChange('selectedSemester')}
                input={
                  <OutlinedInput name="semesters" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.renderNames()}
              </Select>
            </FormControl>
            <FormControl className="menuForm" variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Gruppe</InputLabel>
              <Select
                value={this.state.selectedTeam}
                onChange={this.handleChange('selectedTeam')}
                input={
                  <OutlinedInput name="teams" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.renderTeams()}
              </Select>
            </FormControl>
            <Divider />
            <Typography component="h2" variant="h5" gutterBottom>
              Countdown
            </Typography>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default Admin;
