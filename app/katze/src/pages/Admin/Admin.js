import React, { Component, Fragment } from 'react';
import './Admin.css';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import qs from 'qs';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Views from '../../components/Views/Views';
import Countdown from '../../components/Countdown/Countdown';
import { Button, Box } from '@material-ui/core';
import { updateData } from '../../global/socket';
import { triggerTransition } from '../../global/socket';
import moment from 'moment';


class Admin extends Component {
  constructor() {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      menu: false,
      template: '',
      semesters: [],
      selectedSemester: null,
      teams: [],
      selectedTeam: null,
      views: [],
      selectedViews: [],
      program: [],
      selectedProgram: null,
      content: {
        head: "",
        sub: ""
      },
      countdown: Date,
      countdown_active: false,
      transitionState: '',
      breakPreset: false
    };

    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/semesters/')
      .then(res => {
        this.setState({
          semesters: res.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    axios
      .get('http://localhost:9000/views/')
      .then(res => {
        this.setState({
          views: res.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    
    axios
      .get('http://localhost:9000/programs/')
      .then(res => {
        this.setState({
          program: res.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  updateViews = () => {
    axios
      .get('http://localhost:9000/views/')
      .then(res => {
        this.setState({
          views: res.data,
        });
        console.log(this.state.views);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  toggleDrawer = open => () => {
    this.setState({
      menu: open,
    });
  };

  handleArrayChange = name => event => {
    this.setState({ [name]: event });
  };

  handleChange = name => event => {
    if (event.target.value === 'countdown') {
      this.setState({
        [name]: event.target.value,
        countdown_active: true,
      });

    } else { 
      this.setState({ [name]: event.target.value });
    }
  };

  handleContentChange = name => event => {
    var content = { ...this.state.content }
    content[name] = event.target.value
    this.setState({ content });
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });

    if (name === "breakPreset" && event.target.checked) {
      this.setState({
        content: {
          head: "Pause",
          sub: "Gleich geht es weiter!"
        },
        countdown_active: true
      })
    } else if (name === "breakPreset" && !event.target.checked) {
      this.setState({
        content: {
          head: "",
          sub: ""
        },
        countdown_active: false
      })
    }
  };

  handleSelectChange = name => event => {
    if (name === 'selectedSemester' && event.target.value != 'none'){
    this.setState({
      [name]: event.target.value,
      teams: event.target.value.teams,
    });
    } else if ((name === 'selectedTeam') && event.target.value !== 'none'){
    this.setState({
      [name]: event.target.value,
    });
    }
    else if (name === 'selectedProgram' && event.target.value !== 'none') {
      this.setState({
        content: {
          head: event.target.value.person,
          sub: event.target.value.title
        },
        [name]: event.target.value
      })
    }
  };


  handleSubmit = e => {
    var team ={}
    if (this.state.template == 'teams') {
       team = {
        content: {
          head: this.state.content.head,
          sub: this.state.content.sub,
        },
        countdown: this.state.countdown,
        countdown_active: this.state.countdown_active,
        team_layer: this.state.selectedTeam.id,
        animation: this.state.template
      }
    } else {
       team = {
        content: {
          head: this.state.content.head,
          sub: this.state.content.sub,
        },
        countdown: this.state.countdown,
        countdown_active: this.state.countdown_active,
        // team_layer: this.state.selectedTeam.id,
        animation: this.state.template
      }
    }

    var query = qs.stringify(team, { allowDots: true })
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    for (var view of this.state.selectedViews) {
      axios.post('http://localhost:9000/views/' + view.id, query, config)
        .then(res => {
          this.updateViews();

          updateData(res.data.id)

        })
    }


    e.preventDefault();

  }

  renderNames() {
    if (this.state.semesters != null) {
      return this.state.semesters.map((item, i) => {
        return <MenuItem value={item}>{item.year}</MenuItem>;
      });
    } else {
      return;
    }
  }

  renderProgram() {
    if (this.state.program != null) {
      return this.state.program.map((item, i) => {
        return <MenuItem value={item}>{item.person}</MenuItem>;
      });
    } else {
      return;
    }
  }

  renderTeams() {
    if (this.state.teams != null) {
      return this.state.teams.map((item, i) => {
        return <MenuItem value={item}>{item.name}</MenuItem>;
      });
    } else {
      return;
    }
  }

  triggerTransitionStart = (e) => {
    this.setState({
      transitionState: 'start'
    })
    triggerTransition("start")
    e.preventDefault()
  }

  triggerTransitionEnd = (e) => {
    this.setState({
      transitionState: 'end'
    })
    triggerTransition("end")
    e.preventDefault()
  }

  render() {
    return (
      <div className="Admin">
        <form onSubmit={this.handleSubmit}>

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
          <Views views={this.state.views} onChange={this.handleArrayChange('selectedViews')} viewAdded={this.updateViews}/>
          <Drawer
            id="sideMenu"
            variant="permanent"
            anchor="right"
            open={this.state.menu}
            onClose={this.toggleDrawer(false)}
            onOpen={this.toggleDrawer(true)}
          >
            <div className="menuWidth">
              <Typography component="h2" variant="h5" gutterBottom>
                Template
            </Typography>
              <Box m={2}>
                <FormControl className="menuForm" variant="outlined" fullWidth margin="normal">
                  <InputLabel htmlFor="outlined-age-simple">Template</InputLabel>
                  <Select
                    value={this.state.template}
                    onChange={this.handleChange('template')}
                    input={
                      <OutlinedInput name="template" labelWidth={65} id="outlined-age-simple" />
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'teams'}>Teams</MenuItem>
                    <MenuItem value={'program'}>Programm</MenuItem>
                    {/* <MenuItem value={'countdown'}>Countdown</MenuItem> */}
                    <MenuItem value={'timetable'}>Zeitplan</MenuItem>
                    <MenuItem value={'sponsors'}>Sponsoren</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* TEAM TEMPLATE */}
              {this.state.template === 'teams' && (
                <div>
                  <Divider />
                  <Typography component="h2" variant="h5" gutterBottom>
                    Info Layer
                </Typography>
                  <Box m={2}>
                    <FormControl className="menuForm" variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="outlined-age-simple">
                        Semester
                      </InputLabel>
                      <Select
                        value={this.state.selectedSemester || 'none'}
                        onChange={this.handleSelectChange('selectedSemester')}
                        input={
                          <OutlinedInput name="semesters" labelWidth={65} id="outlined-age-simple" />
                        }
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
                        {this.renderNames()}
                      </Select>
                    </FormControl>
                    <FormControl className="menuForm" variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="outlined-age-simple">Gruppe</InputLabel>
                      <Select
                        value={this.state.selectedTeam || 'none'}
                        onChange={this.handleSelectChange('selectedTeam')}
                        input={
                          <OutlinedInput name="teams" labelWidth={52} id="outlined-age-simple" />
                        }
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
                        {this.renderTeams()}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              )}

              {this.state.template === 'program' && (
                <div>
                  <Divider />
                  <Typography component="h2" variant="h5" gutterBottom>
                    Info Layer
                </Typography>
                  <Box m={2}>
                    <FormControl className="menuForm" variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="outlined-age-simple">
                        Programm
                      </InputLabel>
                      <Select
                        value={this.state.selectedProgram || 'none'}
                        onChange={this.handleSelectChange('selectedProgram')}
                        input={
                          <OutlinedInput name="program" labelWidth={65} id="outlined-age-simple" />
                        }
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
                        {this.renderProgram()}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              )}

              {/* TEXT TEMPLATE */}
              {this.state.template === 'text' && (
                <div>
                  <Divider />
                  <Typography component="h2" variant="h5" gutterBottom>
                    Info Layer
                </Typography>
                  <Box display="flex" ml={1} alignItems="center">
                    <Switch
                      checked={this.state.breakPreset}
                      onChange={this.handleSwitchChange('breakPreset')}
                      value="checked"
                      color="primary"
                    />
                    <Typography component="p" variant="body1" gutterBottom>
                      Pause
                </Typography>
                  </Box>
                  <Box m={2}>

                  <TextField
                    id="outlined-name"
                    label="Titel"
                    value={this.state.content.head || ''}
                    onChange={this.handleContentChange('head')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="outlined-name"
                    label="Untertitel"
                    value={this.state.content.sub || ''}
                    onChange={this.handleContentChange('sub')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    />
                    </Box>
                </div>
              )}
              <Divider />
              <Box display="flex" alignItems="center">
                <Typography component="h2" variant="h5" gutterBottom>
                  Countdown
                </Typography>
                <Switch
                  checked={this.state.countdown_active}
                  onChange={this.handleSwitchChange('countdown_active')}
                  value="checked"
                  color="primary"
                />
              </Box>
              {this.state.countdown_active && (
                <Countdown getTargetTime={this.handleArrayChange('countdown')} />
              )}
              <Box m={2}>
                {this.state.selectedViews.length > 0 && (this.state.content.head != '' || this.state.content.sub != '' || (this.state.countdown_active && this.state.template !== '') || this.state.selectedTeam != null || this.state.template === 'timetable' || this.state.template === 'sponsors' || this.state.template === 'program') ? (
                  <Button color="primary" variant="contained" type="submit">
                    Senden
                  </Button>
                ) : (
                    <Button color="primary" variant="contained" type="submit" disabled>
                      Senden
                    </Button>
                )} 
              </Box>

              <Box m={2} mt={5}>
                {(this.state.selectedViews.length === 1 && this.state.selectedViews[0].isMain) && (
                  <Fragment>
                  <div className="bottom">
                    {this.state.transitionState !== 'start' ? (
                      <Button color="primary" variant="contained" onClick={this.triggerTransitionStart}>
                        Start Transition
                      </Button>
                    ) : (
                        <Button color="primary" variant="contained" onClick={this.triggerTransitionStart} disabled>
                          Start Transition
                      </Button>
                    )}

                    {this.state.transitionState === 'start' ? (
                      <Button color="primary" variant="contained" onClick={this.triggerTransitionEnd}>
                        End Transition
                      </Button>
                    ) : (
                        <Button color="primary" variant="contained" onClick={this.triggerTransitionEnd} disabled>
                          End Transition
                      </Button> 
                      )}
                  </div>
                  </Fragment>
              ) }
              </Box>
            </div>
          </Drawer>
        </form>
      </div>
    );
  }
}

export default Admin;
