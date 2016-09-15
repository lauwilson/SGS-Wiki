'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Button extends Component {
    _getStyle() {
        var style = styles.default;

        // TODO: Consider whether it is safe to reduce if-check to simply use
        // this.props.style as the conditional.
        if (typeof this.props.style !== 'undefined' && this.props.style) {
            // Restrict usage of Stylesheet.flatten() due to supposed React compiler
            // de-optimizations.
            style = StyleSheet.flatten([style, this.props.style])
        }

        return style;
    }

    render() {
        var componentStyle = this._getStyle();

        return (
            <TouchableOpacity onPress={this.props.onPress} style={componentStyle}>
                <Text>Button</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: 'cyan'
    }
});
