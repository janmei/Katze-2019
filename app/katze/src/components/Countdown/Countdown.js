import React, { Component } from 'react';
import './Countdown.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { TextField, Box } from '@material-ui/core';




class Countdown extends Component {
    constructor() {
        super();
    }

    handleChange = name => event => {
        var time = event.target.value;
        var timeArray = time.split(":");

        var now = new Date();
        var endMinutes = moment(now).add(timeArray[0], 'minutes')
        var endTime = moment(endMinutes).add(timeArray[1], 'seconds')

        console.log(endTime);
        
        // this.setState({ ...this.state, [name]: event.target.value });
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
                    onChange={this.handleChange('countdown')}
                />
            </Box>
        );
    }
}

export default Countdown;
