import React, { Component } from 'react'
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

/**
 * An avatar shows a picture of a person with rounded corners.
 */
var Avatar = React.createClass({

    propTypes: {
        picture: React.PropTypes.string.isRequired,
        diameter: React.PropTypes.number.isRequired,
        onLoad: React.PropTypes.func.isRequired,
    },

    render: function() {
        var dimensions = {
            width: this.props.diameter,
            height: this.props.diameter,
            // Use the border radius to cut the image
            // into a perfect circle.
            borderRadius: this.props.diameter / 2,
        };

        return (
            <View>
                <Image
                    source={{uri: this.props.picture }}
                    style={[styles.avatar, dimensions]}
                    onLoad={this.props.onLoad}>
                    {this.props.children}
                </Image>
            </View>
        );
    }
});


// Styles
var styles = StyleSheet.create({
    avatar: {
        borderWidth: 1,
        borderColor: 'transparent'
    }
});

module.exports = Avatar;
