'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT, CARD_ASPECT_RATIO } from '../StyleConstants.js';
import { ListView } from 'realm/react-native';
import realm from '../data/realm.js';
import initializeDummyData from '../data/initializer.js';
import getImage from '../data/image_manifest.js';

/* TODO: Clean up debug styling in returned JSX elements */
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

        var margin = 10;
        var cardWidth = (this.screenWidth - (8 * margin)) / 3;
        var cardHeight = CARD_ASPECT_RATIO * cardWidth;

        var goToCardDetailWithProps = () => Actions.cardDetail({heroData: rowData, title: rowData.name});

        return (
            <TouchableOpacity style={{width: cardWidth,
                                        height: cardHeight,
                                        margin: 10,
                                        backgroundColor: 'red'}}
                                onPress={goToCardDetailWithProps}
                                heroData={rowData}>
                <Image source={getImage(rowData.imageKey)}
                                 style={{width: cardWidth,
                                        height: cardHeight,
                                        backgroundColor: 'green'}} />
            </TouchableOpacity>
        );
    }

    render() {
        this.screenWidth = Dimensions.get('window').width;

        return (
            <ViewContainer style={{flex: 1, backgroundColor: 'red'}}>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <ListView contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            screenWidth={this.screenWidth} />
            </ViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'blue'
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10
    }
})
