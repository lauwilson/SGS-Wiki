'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT } from '../StyleConstants.js';
import { ListView } from 'realm/react-native';

import realm from '../data/realm.js';
import initializeDummyData from '../data/initializer.js';

export default class HeroSelectScene extends Component {
    constructor(props) {
        super(props);
        initializeDummyData();

        let dataSource = new ListView.DataSource({
            rowHasChanged(a,b) {
                return a.done !== b.done || a.text !== b.text || a.items || b.items;
            }
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(realm.objects('Hero'))
        }
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        if (rowID === 1)
        {
            console.log("Inside RowID 1")
            console.log(rowData);
            console.log(sectionID);
            console.log(rowID);
            console.log(highlightRow);
        }

        //var image = require(rowData.imageURL);
        return (
            <Image source={require('../../images/liubei.jpg')} />
        );
    }

    render() {
        return (
            <ViewContainer style={{flex: 1, backgroundColor: 'red'}}>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <ListView contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow} />
            </ViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10,
        width: 100,
        height: 100
    }
})
