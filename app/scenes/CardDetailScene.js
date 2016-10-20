'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT } from '../StyleConstants.js';

export default class CardDetailScene extends Component {
    render() {
        return(
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <Image source={require('../../images/liubei.jpg')} />
                <Text>Hero Name</Text>
                <Text>Hero Description</Text>
                <Text>Hero Skills</Text>
                <Text>Hero Synergies</Text>
            </ViewContainer>
        );
    }
}
