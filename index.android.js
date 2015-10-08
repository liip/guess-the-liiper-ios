/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var LoginScreen = require('./src/screens/Login/LoginScreen');
//var LaunchView = require('./src/UI/LaunchView');

var {
  LoggedIn,
  LoginLoading,
  LoggedOut
} = require('./src/screens/Login/LoginScreenExamples');

var {
  PlayingNoAnswer,
  PlayingWrongAnswer,
  PlayingRightAnswer,
} = require('./src/screens/Play/PlayScreenExamples');

var {
  Highscore,
} = require('./src/screens/Highscore/HighscoreScreenExamples');

var {CircularProgressAnimationExample} = require('./src/GuessUIExamples');

var ResultScreenExample = require('./src/screens/Play/ResultScreenExample');
var LaunchView = require('./src/UI/LaunchView');





var StartComponent = PlayingNoAnswer;

var App = React.createClass({
  render: function() {
    return <StartComponent />
  }
});

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
});

AppRegistry.registerComponent('guess_the_liiper', () => App);
