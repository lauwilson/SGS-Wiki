'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

import StatusBarBackground from '../components/StatusBarBackground.js';
import ViewContainer from '../components/ViewContainer.js';
import Button from '../components/Button.js';
import { HEADER_HEIGHT } from '../StyleConstants.js';

import realm from '../data/realm.js';

export default class SplashScene extends Component {
    constructor(props) {
        super(props);
        console.log(realm.path);
    }
    static propTypes = { title: PropTypes.string.isRequired }

    render() {
        const pageTwoProps = () => Actions.heroSelect;
        return (
            <ViewContainer>
                <StatusBarBackground />
                <StatusBar barStyle='default' />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'blue' }}>
                    <Image source={require('../../images/default.jpg')} />

                    <Text>{this.props.title}</Text>
                    {/* TODO: Route this onPress to something useful */}
                    <Button onPress={Actions.heroSelect} style={{height: 50, width: 100, backgroundColor: 'green'}} />
                </View>
            </ViewContainer>
        );
    }
}
