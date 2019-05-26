import React, { Component } from 'react';
import './Countdown.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import { TextField, Box } from '@material-ui/core';



class Countdown extends Component {
    constructor() {
        super();

        this.state = {
            checked: false
        }
    }

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {
        return (
            <Box m={2} display="flex">
                <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue="10:00"
                    className="countdownInput"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 60, // 5 min
                    }}
                />
            </Box>
        );
    }
}

export default Countdown;
