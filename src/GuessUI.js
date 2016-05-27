/* @flow */
'use strict';
console.log('GuessUI');
import React, { Component } from 'react'
var Variables = require('./Variables');
import {
  Image,
  StyleSheet,
} from 'react-native';


var ScrollView = React.createClass({
  render: function() :ReactElement {
    return (
      <React.ScrollView contentContainerStyle={this.props.style}>
        {this.props.children}
      </React.ScrollView>
    );
  },
});

var FaceGridBackground =  React.createClass({
  render() {
    return (
      <Image
        style={[styles.faceGridBackground, this.props.style]}
        source={{ uri: 'bg', isStatic: true }}>
        {this.props.children}
      </Image>
    );
  }
});

// Styles
var styles = StyleSheet.create({
  faceGridBackground: {
    flex: 1,
    // resizeMode: Image.resizeMode.cover,
  },
});


module.exports = {
  Button: require('./UI/Button'),
  Grid: require('./UI/Grid'),
  FaceGridBackground: FaceGridBackground,
  ProgressAnimation: require('./UI/ProgressAnimation'),
  ProgressCircle: require('./UI/ProgressCircle'),
  ProgressBar: require('./UI/ProgressBar'),
  ScrollView: ScrollView,
  Icon: require('./UI/LiipIconFont'),
  Link: require('./UI/Link'),
}

console.log('GuessUI end');
