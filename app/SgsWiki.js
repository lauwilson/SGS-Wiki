'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Navigator } from 'react-native';
import ViewContainer from './components/ViewContainer.js';
import StatusBarBackground from './components/StatusBarBackground.js';
import StartScene from './scenes/StartScene.js';

class SgsWiki extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ index: 0 }}
                renderScene={ (route, navigator) => {
                    return <StartScene title={route.title} />
                } }
            />
        )
    }
}

module.exports = SgsWiki;
