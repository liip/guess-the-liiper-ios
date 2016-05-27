/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react'

import {
  div,
  AppRegistry,
  Text,
  BackAndroid,
  Navigator,
  StyleSheet,
  View
} from 'react-native'

var LoginScreen = require('./src/screens/Login/LoginScreen')

/**
 * Example views used for development.
 *
 * Change the StartComponent to show different states of the app.
 * Useful when styling with live reload.
 */
// var {
//     LoggedIn,
//     LoginLoading,
//     LoggedOut
// } = require('./src/screens/Login/LoginScreenExamples')
//
// var {
//     PlayingNoAnswer,
//     PlayingWrongAnswer,
//     PlayingRightAnswer,
// } = require('./src/screens/Play/PlayScreenExamples')
//
// var {
//     Highscore,
// } = require('./src/screens/Highscore/HighscoreScreenExamples')

// var {CircularProgressAnimationExample} = require('./src/GuessUIExamples')

// var ResultScreenExample = require('./src/screens/Play/ResultScreenExample')
// var LaunchView = require('./src/UI/LaunchView')

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false
  }

  _navigator.pop()
  return true
});

var StartComponent = LoginScreen
var _navigator

//TODO check remove navigator hack
var App = React.createClass({
  renderScene: function (route, navigator) {
    _navigator = navigator;
    return <route.component navigator={navigator}/>;
  },

  render: function () {
    return (
      <Navigator
        initialRoute={{id: 'Home', component: LoginScreen }}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        renderScene={this.renderScene}/>)
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  // Style the whole content below the title bar.
  // itemWrapper: {
  //   backgroundColor: 'transparent',
  // },
})

AppRegistry.registerComponent('guess_the_liiper', () => App)
