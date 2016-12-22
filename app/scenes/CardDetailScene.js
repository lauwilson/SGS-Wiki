'use strict';

import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import TouchableImage from '../components/TouchableImage.js';
import { HEADER_HEIGHT, CARD_ASPECT_RATIO } from '../StyleConstants.js';
import realm from '../data/realm.js';
import getImage from '../data/image_manifest.js'

export default class CardDetailScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardWidth = Dimensions.get('window').width / 2;
        var cardHeight = CARD_ASPECT_RATIO * cardWidth;
        let partnerCardWidth = Dimensions.get('window').width / 3;
        let partnerCardHeight = CARD_ASPECT_RATIO * partnerCardWidth;
        let navigationBarStyle = this.props.navigationBarStyle;
        let leftButtonIconStyle = this.props.leftButtonIconStyle;
        return (
            <ViewContainer>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <ScrollView>
                    <Image source={getImage(this.props.hero.key)}
                            style={[styles.heroImage, {height: cardHeight, width: cardWidth, margin: 10 }]}/>
                    <Text style={styles.heading}>Abilities</Text>
                    {
                        this.props.hero.abilities.map(function(ability, index) {
                            return (
                                <View key={index}>
                                    <Text style={styles.subHeading}>{ability.name}</Text>
                                    <Text style={{marginLeft: 10, marginRight: 10}}>{ability.description}</Text>
                                </View>
                            )
                        })
                    }
                    <Text style={styles.heading}>Synergistic Partners</Text>
                    <ScrollView horizontal={true} style={styles.partnerList}>
                    {
                        this.props.hero.partners.map(function(partner, index) {
                            let goToCardDetailWithProps = () => Actions.cardDetail({hero: partner,
                                                                                    title: partner.name,
                                                                                    navigationBarStyle: navigationBarStyle,
                                                                                    leftButtonIconStyle: leftButtonIconStyle});
                            return (
                                <TouchableImage key={index}
                                                style={{width: partnerCardWidth,
                                                        height: partnerCardHeight,
                                                        margin: 10}}
                                                onPress={goToCardDetailWithProps}
                                                source={getImage(partner.key)} />
                            );
                        })
                    }
                    </ScrollView>
                </ScrollView>
            </ViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
    heroImage: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    partnerList: {
        alignSelf: 'center',
        marginTop: 5,
        flexDirection: 'row'
    }
});
