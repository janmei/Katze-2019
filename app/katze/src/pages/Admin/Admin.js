import React, { Component } from 'react';
import './Admin.css';
import Button from '@material-ui/core/Button';

class Admin extends Component {
  render() {
    return (
      <div className="Admin">
        Admin View
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default Admin;
