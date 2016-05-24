import React, { Component } from 'react'
var Variables = require('../Variables');
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

var Link = React.createClass({
  render: function() {
    return (
        <TouchableHighlight
            onPress={this.props.onPress}
            style={[styles.link, this.props.style]}
            underlayColor="transparent">
          <Text style={[styles.linkText, this.props.textStyle]}>
            {this.props.children}
          </Text>
        </TouchableHighlight>
    );
  },
});

// Styles
var styles = StyleSheet.create({
  link: {
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    color: Variables.GREY360,
  },
});

module.exports = Link;
