import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

import './Views.css';
import axios from 'axios';
import View from '../View/View';

class Views extends Component {
    constructor() {
        super();

        this.state = {
            selectedViews: [],
        }

    }

    handleSelectedViews = e => {
        if (e.checked) {
            this.setState(state => {
                const selectedViews = state.selectedViews.concat(e.id);
                return {
                    selectedViews,
                };
            }, function () {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.selectedViews);
                }
            });
        } else {
            this.setState(state => {
                const selectedViews = state.selectedViews.filter((item, j) => e.id !== item);
                return {
                    selectedViews,
                };
            }, function () {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.selectedViews);
                }
            });
        }
    }

    renderNames() {

        if (this.props.views != null) {
            return this.props.views.map((item, i) => {
                return (
                    <View title={item.content.head} sub={item.content.sub} name={item.name} id={item.id} onChange={this.handleSelectedViews}></View>
                )
            })
        } else {
            return;
        }
    }

    render() {
        return (
            <div>
                <Box display="flex">
                    {this.renderNames()}
                </Box>
            </div>
        )
    }
}

export default Views;
