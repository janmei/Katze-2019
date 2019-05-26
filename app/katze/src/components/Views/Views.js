import React, { Component } from 'react';
import './Views.css';
import axios from 'axios';
import View from '../View/View';

class Views extends Component {
    constructor() {
        super();

    }



    renderNames() {

        if (this.props.views != null) {
            return this.props.views.map((item, i) => {
                return (
                    <View title={item.content.head} sub={item.content.sub} key={item.id}></View>
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
