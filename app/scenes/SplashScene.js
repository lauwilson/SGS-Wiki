'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

import StatusBarBackground from '../components/StatusBarBackground.js';
import ViewContainer from '../components/ViewContainer.js';
import Button from '../components/Button.js';
import { HEADER_HEIGHT } from '../StyleConstants.js';

export default class SplashScene extends Component {
    static propTypes = { title: PropTypes.string.isRequired }


    _navigate(sceneName) {
        this.props.navigator.push({
            scene: sceneName,
        });
    }

    _handleStartBtn() {
    }

    render() {
        const pageTwoProps = () => Actions.second({text: 'Hello World!'});
        return (
            <ViewContainer>
                <StatusBarBackground style={{height: HEADER_HEIGHT }}/>
                <StatusBar barStyle='default' />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'blue' }}>
                    <Image source={require('../../images/sgs_logo.png')} />

                    <Text>{this.props.title}</Text>
                    {/* TODO: Route this onPress to something useful */}
                    <Button onPress={pageTwoProps} style={{height: 50, width: 100, backgroundColor: 'green'}} />
                </View>
            </ViewContainer>
        );
    }
}
