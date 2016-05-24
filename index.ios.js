/**
 * Guess the Liiper React Native App
 * https://guess.liip.ch
 */
'use strict';

import React, { Component } from 'react'
import {
  div,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

var LoginScreen = require('./src/screens/Login/LoginScreen');

/**
 * Example views used for development.
 *
 * Change the StartComponent to show different states of the app.
 * Useful when styling with live reload.
 */
//var {
//  LoggedIn,
//  LoginLoading,
//  LoggedOut
//} = require('./src/screens/Login/LoginScreenExamples');

//var {
//  PlayingNoAnswer,
//  PlayingWrongAnswer,
//  PlayingRightAnswer,
//} = require('./src/screens/Play/PlayScreenExamples');

//var {
//  Highscore,
//} = require('./src/screens/Highscore/HighscoreScreenExamples');

//var {CircularProgressAnimationExample} = require('./src/GuessUIExamples');

//var ResultScreenExample = require('./src/screens/Play/ResultScreenExample');
//var LaunchView = require('./src/UI/LaunchView');

/**
 * @type {ReactElement} Component to display when the app starts, default: LoginScreen.
 */
var StartComponent = LoginScreen;

/**
 * Main application container defining
 * navigation and routing.
 */
class App extends Component {
  render() {
    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: StartComponent.title || 'Guess the Liiper',
            component: StartComponent,
          }}
          itemWrapperStyle={styles.itemWrapper}
        />
    );
  }
};

// Styles
var styles = StyleSheet.create({
  // Style the main app component.
  container: {
    flex: 1,
  },

  // Style the whole content below the title bar.
  itemWrapper: {
    backgroundColor: 'transparent',
  },
});

console.log('index.ios.js')

AppRegistry.registerComponent('guess_the_liiper', () => App);
