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
    constructor() {
        super();
    }

    render() {
        return (
            <Card className="card">
                <CardContent>
                    <Typography color="textSecondary">
                        {this.props.title}
                        {this.props.sub}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default View;
