'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import StatusBarBackground from '../components/StatusBarBackground.js';
import ViewContainer from '../components/ViewContainer.js';
import Button from '../components/Button.js'

export default class StartScene extends Component {
    static get defaultProps() {
        return { title: "Default Title" };
    }

    _handleStartBtn() {
        console.log("Button Clicked");
    }

    render() {
        return (
            <ViewContainer>
                <StatusBarBackground />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image source={require('../../images/sgs_logo.png')} />
                    <Button onPress={this._handleStartBtn} style={{height: 100, width: 100}} />
                </View>
            </ViewContainer>
        );
    }
}
