import React, { Component } from 'react';
import './Views.css';
import axios from 'axios';
import View from '../View/View';

class Views extends Component {
    constructor() {
        super();

        // SET THE Views ID TO GLOBAL STATE
        this.state = {
        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/views/').then(res => {
            console.log(res.data);
            
            this.setState({
                views: res.data
            })
        }).catch(function (err) {
            console.log(err);
        })
    }

    renderNames() {
        if (this.state.views != null) {
            return this.state.views.map((item, i) => {
                return (
                    <View content={item.content} ></View>
                )
            })
        } else {
            return;
        }
    }

    render() {
        return (
            <div>
                {this.renderNames()}
            </div>
        )
    }
}

export default Views;
