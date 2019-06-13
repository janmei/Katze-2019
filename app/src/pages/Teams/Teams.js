import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
                    <TableCell className="col">Projektname</TableCell>
                    <TableCell className="col">Mitglieder</TableCell>
                    <TableCell className="col">Kurzbeschreibung</TableCell>
                    <TableCell className="col">Detailbeschreibung</TableCell>
                    <TableCell className="col">Kontakt E-Mail</TableCell>
                    <TableCell className="col">Hashtags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semester.teams.map(row => (
                    <TableRow key={row.id} hover={true}>
                      {row.name && (
                        <Fragment>
                          <TableCell component="th" scope="row">
                            <Link to={'/team/' + row.id}>{row.name}</Link>
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
                            {row.contact}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            #ifexhibition #imd #whatif #interactivemediadesign
                            #h_da #mediencampusdieburg {row.hashtags}
                          </TableCell>
                        </Fragment>
                      )}
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
