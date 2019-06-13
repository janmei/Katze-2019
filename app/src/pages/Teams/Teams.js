import React, { Component } from 'react';
import './Teams.css';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

class Teams extends Component {
  constructor({ match }) {
    super();

    this.state = {
      semesters: []
    };
  }

  componentDidMount = () => {
    this.renderTables();
  };

  renderTables = () => {
    axios
      .get('/api/semesters/')
      .then(res => {
        console.log(res.data);

        this.setState({
          semesters: res.data
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="root">
        {this.state.semesters.map(semester => (
          <div>
            <Typography variant="h5" component="p">
              {semester.year}. Semester
            </Typography>
            <Paper className="paper">
              <Table key={semester.name} className="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Projektname</TableCell>
                    <TableCell>Mitglieder</TableCell>
                    <TableCell>Kurzbeschreibung</TableCell>
                    <TableCell>Detailbeschreibung</TableCell>
                    <TableCell>Hashtags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semester.teams.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.persons.join(', ')}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.abstract}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.longform}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        #ifexhibition #imd #whatif {row.hashtags}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ))}
      </div>
    );
  }
}

export default Teams;
