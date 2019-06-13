import React, { Component, Fragment } from 'react';
import './TeamDetail.css';
import axios from 'axios';
import qs from 'qs';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { Typography, Box } from '@material-ui/core';

class TeamDetail extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
      name: '',
      abstract: '',
      persons: [],
      semester: null,
      hidden: false,
      longform: '',
      hashtags: '',
      open: false,
      snackMessage: '',
      messageType: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/teams/' + this.state.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          persons: res.data.persons,
          abstract: res.data.abstract,
          semester: res.data.semester,
          longform: res.data.longform,
          contact: res.data.contact,
          hashtags: res.data.hashtags
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleSubmit = e => {
    const team = qs.stringify(
      {
        name: this.state.name,
        persons: this.state.persons,
        abstract: this.state.abstract,
        longform: this.state.longform,
        hashtags: this.state.hashtags,
        contact: this.state.contact
      },
      { arrayFormat: 'repeat' }
    );
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    axios
      .post('/api/teams/' + this.state.id, team, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.showMessage('success', 'Projekt aktualisiert', 5000);
      })
      .catch(err => {
        this.showMessage(
          'error',
          'Fehler beim aktualisieren. Melde Dich am besten beim Präsentationsraum Team.',
          100000
        );
      });

    e.preventDefault();
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (this.state.persons[0] === '') {
      this.setState({
        hidden: false
      });
    }

    if (target.name == 'abstract') {
      var label;
      var char = target.value.length;
      console.log(char);

      if (char <= 160) {
        this.setState({
          [name]: value
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleEmailListChange(index, event) {
    var persons = this.state.persons.slice(); // Make a copy of the persons first.
    persons[index] = event.target.value; // Update it with the modified email.
    this.setState({ persons: persons }); // Update the state.
  }

  renderNames() {
    if (this.state.persons != null) {
      return this.state.persons.map((item, i) => {
        return (
          <TextField
            id="filled-name"
            label="Name"
            name="person"
            key={i}
            value={item}
            onChange={this.handleEmailListChange.bind(this, i)}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!this.state.hidden && (
                    <IconButton
                      aria-label="Löschen"
                      onClick={this.removePeople.bind(this, i)}
                    >
                      <Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
          />
        );
      });
    } else {
      return;
    }
  }

  addMember = e => {
    e.preventDefault();
    this.setState(prevState => ({
      persons: [...prevState.persons, '']
    }));

    if (this.state.persons.length > 0) {
      this.setState({
        hidden: false
      });
    }
  };

  toggleHidden() {
    const hidden = this.state.hidden;
    if (this.state.persons.length < 2) {
      this.setState({
        hidden: !hidden
      });
    }
    console.log(hidden, this.state.persons);
  }

  removePeople = index => {
    // index.preventDefault()
    this.setState({
      persons: this.state.persons.filter((x, i) => i !== index)
    });
    if (this.state.persons.length === 1) {
      this.setState({
        persons: ['']
      });

      this.setState({
        hidden: true
      });
    }
  };

  showMessage = (type, msg, time) => {
    this.setState({
      messageType: type,
      open: true,
      snackMessage: msg
    });

    setTimeout(() => {
      this.hideMessage();
    }, time);
  };

  hideMessage = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="doc">
        <h3>
          {this.state.semester}. Semester – {this.state.name}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <TextField
              id="filled-name"
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="filled-name"
              multiline
              label="Kurzbeschreibung (noch Buchstaben)"
              name="abstract"
              value={this.state.abstract}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="filled-name"
              multiline
              label="Detailbeschreibung"
              name="longform"
              value={this.state.longform}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="filled-name"
              multiline
              label="Hashtags"
              helperText="Jedes Wort mit # beginnen und durch Leerzeichen trennen"
              name="hashtags"
              value={this.state.hashtags}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="filled-name"
              label="Kontakt E-Mail"
              helperText="E-Mail an die Gäste bei Interesse schreiben können"
              name="contact"
              value={this.state.contact}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <p>Mitglieder</p>
            <FormControl fullWidth>{this.renderNames()}</FormControl>
            <div className="margin-bot">
              <Button variant="outlined" onClick={this.addMember}>
                Mitglied hinzufügen
              </Button>
            </div>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Button
                id="outlined-button-file"
                color="primary"
                variant="contained"
                type="submit"
              >
                Senden
              </Button>
              <Typography
                component="p"
                className={['message', this.state.messageType]}
              >
                {this.state.open && (
                  <Fragment>{this.state.snackMessage}</Fragment>
                )}
              </Typography>
            </Box>
          </Grid>
        </form>
      </div>
    );
  }
}

export default TeamDetail;
