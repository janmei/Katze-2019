import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
class TeamDetail extends Component {
  constructor({ match }) {
    super();

    // SET THE SLIDE ID TO GLOBAL STATE
    this.state = {
      id: match.params.id,
      name: "",
      abstract: "",
      persons: [],
      semester: null
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
          <div key={i} className="element">
            <input type="text" onChange={this.handleEmailListChange.bind(this, i)} value={item} />
            <button onClick={this.removePeople.bind(this, i)}>x</button>
          </div>
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
  }

  removePeople = (index) => {
    // index.preventDefault()
    this.setState({
      persons: this.state.persons.filter((x, i) => i != index)
    });
  }

  render() {
    return (
      <div className="doc">
        <h3>Semester {this.state.semester}</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="name" value={this.state.name} onChange={this.handleInputChange} />
          <input name="abstract" value={this.state.abstract} onChange={this.handleInputChange} />
          <p>Mitglieder</p>
          {this.renderNames()}
          <button onClick={this.addMember}>Gruppenmitglied hinzufügen</button>

          <button type="submit">Senden</button>
        </form>
      </div>
    );
  }
}

export default TeamDetail;