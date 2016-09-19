'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground.js';
import ViewContainer from '../components/ViewContainer.js';
import Button from '../components/Button.js'

export default class SecondScene extends Component {
    render() {
        return(
            <ViewContainer>
                <StatusBarBackground style={{height: 64}} />
                <StatusBar barStyle='light-content' />
                <Text>Welcome to the second screen! {this.props.text}</Text>

            </ViewContainer>
        );
    }
}
