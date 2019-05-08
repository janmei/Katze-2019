import React, { Component } from 'react';
import './Admin.css';

import Icon from '@material-ui/core/Icon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Admin extends Component {
  constructor() {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      menu: false,
    };
  }

  toggleDrawer = open => () => {
    this.setState({
      menu: open,
    });
  };

  render() {
    return (
      <div className="Admin">
        Admin View <br />
        <Button onClick={this.toggleDrawer(true)}>
          <Icon>menz</Icon>
        </Button>
        {/* TODO: Create an Styled Component out of this with an different width */}
        {/*  https://material-ui.com/customization/overrides/ */}
        <SwipeableDrawer
          id="sideMenu"
          anchor="right"
          open={this.state.menu}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div className="menuWidth" />
          <Typography component="h2" variant="h5" gutterBottom>
            Template
          </Typography>
          <Divider />
          <Typography component="h2" variant="h5" gutterBottom>
            Animation
          </Typography>
          <Divider />
          <Typography component="h2" variant="h5" gutterBottom>
            Countdown
          </Typography>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default Admin;
