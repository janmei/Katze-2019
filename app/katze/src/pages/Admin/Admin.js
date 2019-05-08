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

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Admin extends Component {
  constructor() {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      menu: false,
      testSelect: '',
    };
  }

  toggleDrawer = open => () => {
    this.setState({
      menu: open,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
                value={this.state.testSelect}
                onChange={this.handleChange('testSelect')}
                input={
                  <OutlinedInput name="testSelect" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Mocked Template A</MenuItem>
                <MenuItem value={2}>Mocked Template B</MenuItem>
                <MenuItem value={3}>Mocked Template C</MenuItem>
              </Select>
            </FormControl>
            <Divider />
            <Typography component="h2" variant="h5" gutterBottom>
              Animation
            </Typography>
            <FormControl className="menuForm" variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Semester</InputLabel>
              <Select
                value={this.state.testSelect}
                onChange={this.handleChange('testSelect')}
                input={
                  <OutlinedInput name="testSelect" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Mocked Template A</MenuItem>
                <MenuItem value={2}>Mocked Template B</MenuItem>
                <MenuItem value={3}>Mocked Template C</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="menuForm" variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Gruppe</InputLabel>
              <Select
                value={this.state.testSelect}
                onChange={this.handleChange('testSelect')}
                input={
                  <OutlinedInput name="testSelect" id="outlined-age-simple" />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Mocked Template A</MenuItem>
                <MenuItem value={2}>Mocked Template B</MenuItem>
                <MenuItem value={3}>Mocked Template C</MenuItem>
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
