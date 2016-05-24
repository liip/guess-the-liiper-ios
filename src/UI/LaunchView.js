/* @flow */
import React, { Component } from 'react'
var Variables = require('../Variables');
import { StyleSheet, StatusBarIOS, View, Text, Image} from 'react-native';
var { FaceGridBackground, ScrollView, Button, Link } = require('../GuessUI');

var LaunchView = React.createClass({

  statics: {
    title: ' ',
  },

  render: function() {
    return (
      <FaceGridBackground>
        <View style={styles.container}>
         <View style={styles.loginContainer}>
              <Image style={styles.logo} source={{ uri: 'GuessLogo', isStatic: true }}/>
          </View>
        </View>
      </FaceGridBackground>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = LaunchView;
