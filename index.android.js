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
class App extends Component {
  renderScene(route, navigator) {
    _navigator = navigator;
    return <route.component navigator={navigator}/>;
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          id: 'Home',
          title: StartComponent.title || 'Guess the Liiper',
          component: LoginScreen
        }}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        renderScene={this.renderScene}
        itemWrapperStyle={styles.itemWrapper}
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Style the whole content below the title bar.
  itemWrapper: {
    backgroundColor: 'transparent',
  },
})

console.log('index.android.js')

AppRegistry.registerComponent('guess_the_liiper', () => App)
