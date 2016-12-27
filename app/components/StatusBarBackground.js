'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

export default class StatusBarBackground extends Component {
    constructor(props) {
        super(props);
    }

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
        return(
            <View style={componentStyle}>
                <StatusBar backgroundColor={this.props.statusBarColor} translucent={false} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    default: {
        height: 20,
    }

});
