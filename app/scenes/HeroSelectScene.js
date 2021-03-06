'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';
import Realm from 'realm';
import ViewContainer from '../components/ViewContainer.js';
import TouchableImage from '../components/TouchableImage.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT, CARD_ASPECT_RATIO, COLOR_SHU, COLOR_WEI, COLOR_WU, COLOR_NEUTRAL } from '../StyleConstants.js';
import { ListView } from 'realm/react-native';
import realm from '../data/realm.js';
import getImage from '../data/image_manifest.js';

/*
TODO: Clean up debug styling in returned JSX elements
TODO: Set constant styling colors to match true faction colours.
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

    _renderRow(rowData) {
        var margin = 10;
        var cardWidth = (this.screenWidth - (8 * margin)) / 3;
        var cardHeight = CARD_ASPECT_RATIO * cardWidth;
        var goToCardDetailWithProps = () => Actions.cardDetail({hero: rowData,
                                                                title: rowData.name,
                                                                navigationBarStyle: this.navBarStyle,
                                                                leftButtonIconStyle: this.leftButtonIconStyle});

        return (
            <TouchableImage style={{width: cardWidth,
                                    height: cardHeight,
                                    margin: 10}}
                            onPress={goToCardDetailWithProps}
                            source={getImage(rowData.key)} />
        );
    }

    render() {
        this.screenWidth = Dimensions.get('window').width;
        let _listView;
        return (
            <ViewContainer style={{flex: 1, backgroundColor: 'red', paddingBottom: 200}}>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} statusBarColor={this.props.statusBarColor} />
                <ListView
                    ref={ (listView) => { _listView = listView} }
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    screenWidth={this.screenWidth}
                    navBarStyle={this.props.navigationBarStyle}
                    leftButtonIconStyle={this.props.leftButtonIconStyle} />
                <View style={styles.forceTabsMargin} />
                <Tabs selected={this.state.selectedFaction} style={{ backgroundColor:'white', borderTopWidth: 1, borderTopColor: '#000' }}
                        onSelect={el => { _listView.scrollTo({y: 0, animated: false});
                                          this._setFaction(el.props.name);}}>
                    <Text name="Shu" selectedIconStyle={{ backgroundColor: COLOR_SHU }} >Shu</Text>
                    <Text name="Wei" selectedIconStyle={{ backgroundColor: COLOR_WEI }} >Wei</Text>
                    <Text name="Wu" selectedIconStyle={{ backgroundColor: COLOR_WU }} >Wu</Text>
                    <Text name="Neutral" selectedIconStyle={{ backgroundColor: COLOR_NEUTRAL }} >Neutral</Text>
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

        let navBarColor;
        switch (faction) {
            case 'Shu':
                navBarColor = COLOR_SHU;
                break;
            case 'Wei':
                navBarColor = COLOR_WEI;
                break;
            case 'Wu':
                navBarColor = COLOR_WU;
                break;
            case 'Neutral':
                navBarColor = COLOR_NEUTRAL;
                break;
        }
        Actions.refresh({navigationBarStyle: { backgroundColor: navBarColor, borderBottomColor: '#000' }, statusBarColor: navBarColor})

    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10
    },
    forceTabsMargin: {
        height: 50
    }
})
