'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import StatusBarBackground from '../components/StatusBarBackground.js';
import ViewContainer from '../components/ViewContainer.js';
import Button from '../components/Button.js';
import { HEADER_HEIGHT, LOGO_ASPECT_RATIO } from '../StyleConstants.js';

import realm from '../data/realm.js';

export default class SplashScene extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = { title: PropTypes.string.isRequired }

    render() {
        let screenWidth = Dimensions.get('window').width;
        let logoWidth = screenWidth * 0.9;
        let logoHeight = LOGO_ASPECT_RATIO * logoWidth;
        return (
            <ViewContainer>
                <StatusBarBackground statusBarColor={this.props.statusBarColor} />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={Actions.heroSelect}>
                        <Image source={require('../../images/sgs-logo.jpg')} style={{ height: logoHeight, width: logoWidth, marginBottom: 30}} />
                        <Text style={{ fontSize: 24, fontStyle: 'italic' }}>Tap to Start</Text>
                    </TouchableOpacity>
                </View>
            </ViewContainer>
        );
    }
}
