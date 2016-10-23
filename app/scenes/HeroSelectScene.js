'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT, CARD_ASPECT_RATIO } from '../StyleConstants.js';
import { ListView } from 'realm/react-native';
import realm from '../data/realm.js';
import initializeDummyData from '../data/initializer.js';
import getImage from '../data/image_manifest.js';

/*
TODO: Clean up debug styling in returned JSX elements
TODO: Set constant styling colors to match true faction colours.
TODO: Most likely, the ListView container will overlap with the bottom tab-bar. Will need to fix in future once data is injected.
*/
export default class HeroSelectScene extends Component {
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged(a,b) {
                return a.done !== b.done || a.text !== b.text || a.items || b.items;
            }
        });

        this.state = { dataSource: dataSource.cloneWithRows(realm.objects('Hero').filtered('faction = "Shu"')), selectedFaction: 'Shu' }
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

                <Tabs selected={this.state.selectedFaction} style={{backgroundColor:'white'}}
                        onSelect={el => this._setFaction(el.props.name)}>
                    <Text name="Shu" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}} selectedStyle={{color:'red'}}>Shu</Text>
                    <Text name="Wei" selectedIconStyle={{borderTopWidth:2,borderTopColor:'blue'}} selectedStyle={{color:'blue'}}>Wei</Text>
                    <Text name="Wu" selectedIconStyle={{borderTopWidth:2,borderTopColor:'green'}} selectedStyle={{color:'green'}}>Wu</Text>
                    <Text name="Legend" selectedIconStyle={{borderTopWidth:2, borderTopColor: 'grey'}} selectedStyle={{color:'grey'}}>Legend</Text>
                </Tabs>
            </ViewContainer>
        );
    }

    _setFaction(faction) {
        let filter = 'faction = "' + faction + '"';
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(realm.objects('Hero').filtered(filter)),
            selectedFaction: faction
        });
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
