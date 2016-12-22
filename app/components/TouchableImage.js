'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

{/*
    Currently class is not in use, nor does it work as intended.
*/}
export default class TouchableImage extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
                <Image source={this.props.source} style={[this.props.style, styles.noMargin, this.props.customImageStyle]} resizeMode='contain'/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    noMargin: {
        margin : 0
    }
});
