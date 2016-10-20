'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT } from '../StyleConstants.js';

export default class CardSelectScene extends Component {
    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'red' }}>
                    <TouchableOpacity onPress={Actions.heroes} style={{ alignItems: 'center', backgroundColor: 'green' }}>
                        <Image onPress={Actions.splash} source={require('../../images/liubei.jpg')} />
                        <Text>Heroes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Actions.second} style={{ alignItems: 'center', backgroundColor: 'cyan' }}>
                        <Image source={require('../../images/wooden_cow.jpg')} />
                        <Text>Cards</Text>
                    </TouchableOpacity>
                </View>
            </ViewContainer>
        );
    }
}
