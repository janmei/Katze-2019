import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class TextRow extends Component {

    handleChange = name => event => {
    this.setState({
      payload: {
        [name]: event.target.value,
      }
    });
  };

  
  render() {
    return (
        <TextField label="Gruppenmitglied" id="margin-none" className="text" helperText="Vorname" value={this.props.obj || ''} onChange={this.handleChange('persons['+this.props.obj+']')} />
          
    );
  }
}

export default TextRow;
