import React, { Component, Suspense } from 'react';
import './TeamDetail.css'
import axios from 'axios';
import qs from 'qs';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

class TeamDetail extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
      name: "",
      abstract: "",
      persons: [],
      semester: null,
      hidden: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:9000/teams/' + this.state.id).then(res => {
      this.setState({
        name: res.data.name,
        persons: res.data.persons,
        abstract: res.data.abstract,
        semester: res.data.semester
      })
    }).catch(function (err) {
      console.log(err);
    })
  }

  handleSubmit = e => {

    const team = qs.stringify({
      name: this.state.name,
      persons: this.state.persons,
      abstract: this.state.abstract
    }, { arrayFormat: 'repeat' })
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('http://localhost:9000/teams/' + this.state.id, team, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    e.preventDefault();

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (this.state.persons[0] === "") {
      this.setState({
        hidden: false
      })
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
          <TextField id="filled-name" label="Name" name="person" key={i} value={item} onChange={this.handleEmailListChange.bind(this, i)} margin="normal" variant="outlined" 
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  { !this.state.hidden && 
                <IconButton
                  aria-label="Löschen"
                    onClick={this.removePeople.bind(this, i)}
                >
                  <Clear />
                </IconButton>
                    }
              </InputAdornment>
            ),
          }}
          />
        )
      })
    } else {
      return;
    }
  }

  addMember = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      persons: [...prevState.persons, ""],
    }));

    if (this.state.persons.length > 0) {
      this.setState({
        hidden: false
      })
    }
  }

  toggleHidden() {
    const hidden = this.state.hidden
    if (this.state.persons.length < 2) {
      this.setState({
        hidden: !hidden
      })
    }
    console.log(hidden, this.state.persons);
    
  }

  removePeople = (index) => {
    // index.preventDefault()
    this.setState({
      persons: this.state.persons.filter((x, i) => i !== index)
    });
    if (this.state.persons.length === 1) {
      this.setState({
        persons: ['']
      })

      this.setState({
        hidden: true
      })
    }
  }

  render() {
    return (
      <div className="doc">
        <h3>{this.state.semester}. Semester – {this.state.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <TextField id="filled-name"  label="Name" name="name" value={this.state.name} onChange={this.handleInputChange} margin="normal" variant="outlined" fullWidth/>
            <TextField id="filled-name" multiline label="Beschreibung" name="abstract" value={this.state.abstract} onChange={this.handleInputChange} margin="normal" variant="outlined" fullWidth/>
            <p>Mitglieder</p>
          <FormControl fullWidth>
            {this.renderNames()}
          </FormControl>
            <div className="margin-bot">
              <Button variant="outlined" onClick={this.addMember}>Mitglied hinzufügen</Button>
            </div>
            <Button id="outlined-button-file" color="primary" variant="contained" type="submit">Senden</Button>
            </Grid>
        </form>
      </div>
    );
  }
}

export default TeamDetail;