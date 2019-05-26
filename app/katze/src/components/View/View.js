import React, { Component } from 'react';
import './View.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class View extends Component {
    constructor({ match }) {
        super();

        // SET THE Views ID TO GLOBAL STATE
        this.state = {

        };
    }

    render() {
        return (
            <Card className="card">
                <CardContent>
                        {this.props.content}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default View;
