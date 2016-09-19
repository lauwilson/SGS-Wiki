'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Navigator } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import ViewContainer from './components/ViewContainer.js';
import StatusBarBackground from './components/StatusBarBackground.js';
import SplashScene from './scenes/SplashScene.js';
import SecondScene from './scenes/SecondScene.js';
import CardSelectScene from './scenes/CardSelectScene.js';

class SgsWiki extends Component {
    constructor(props) {
        super(props);
        console.log("SgsWiki Constructor");
        console.log(props);
    }

    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

const scenes = Actions.create(
    <Scene key='root'>
        <Scene key='splash' component={SplashScene} title='Splash Scene' />
        <Scene key='second' component={SecondScene} title='Second Scene' />
        <Scene initial={true} key='cardSelect' component={CardSelectScene} title='Card Select Scene' />
    </Scene>
);

module.exports = SgsWiki;
