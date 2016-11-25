'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Navigator } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import ViewContainer from './components/ViewContainer.js';
import StatusBarBackground from './components/StatusBarBackground.js';
import SplashScene from './scenes/SplashScene.js';
import SecondScene from './scenes/SecondScene.js';
import HeroSelectScene from './scenes/HeroSelectScene.js';
import CardSelectScene from './scenes/CardSelectScene.js';
import CardDetailScene from './scenes/CardDetailScene.js';

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
        <Scene initial={true} key='splash' component={SplashScene} hideNavBar={true} title='' />
        <Scene key='second' component={SecondScene} title='Second Scene' tabs={true} />
        <Scene key='cardSelect' component={CardSelectScene} title='Card Select Scene' />
        <Scene key='cardDetail' component={CardDetailScene} title='Card Details' />
        <Scene key='heroSelect' component={HeroSelectScene} title='Heroes' hideNavBar={false}
                navigationBarStyle={{backgroundColor: 'rgb(200,112,97)', borderBottomColor: '#000'}}
                leftButtonIconStyle={{tintColor: '#000'}} />
    </Scene>
);

module.exports = SgsWiki;
