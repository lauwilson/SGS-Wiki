'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import getImage from '../data/image_manifest.js';
import { Actions } from 'react-native-router-flux';

{/*
    Currently class is not in use, nor does it work as intended.
*/}
export default class TouchableImage extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={Actions.cardDetail}>
                <Image source={this.props.source} style={this.props.style, styles.noMargin} resizeMode='contain'/>
            </TouchableOpacity>
        );
    }
}
