'use strict';

import React, { Component } from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer.js';
import StatusBarBackground from '../components/StatusBarBackground.js';
import { HEADER_HEIGHT, CARD_ASPECT_RATIO } from '../StyleConstants.js';
import getImage from '../data/image_manifest.js'

export default class CardDetailScene extends Component {
    render() {
        var cardWidth = Dimensions.get('window').width / 2;
        var cardHeight = CARD_ASPECT_RATIO * cardWidth;

        return (
            <ViewContainer>
                <StatusBarBackground style={{ height: HEADER_HEIGHT }} />
                <View style={{margin: 15}}>
                    <Image source={getImage(this.props.heroData.imageKey)}
                            style={[styles.heroImage, {height: cardHeight, width: cardWidth }]}/>
                    <Text style={styles.heading}>Abilities</Text>
                    {
                        this.props.heroData.abilities.map(function(ability, index) {
                            return (
                                <View key={index}>
                                    <Text style={styles.subHeading}>{ability.name}</Text>
                                    <Text>{ability.description}</Text>
                                </View>
                            )
                        })
                    }
                    <Text style={styles.heading}>Hero Synergies</Text>
                </View>
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
        marginBottom: 2
    },
    heroImage: {
        alignSelf: 'center',
        marginBottom: 15,
        width: 100,
        height: 200
    }
});
