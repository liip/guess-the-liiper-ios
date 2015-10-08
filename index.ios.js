/**
 * Guess the Liiper React Native App
 * https://guess.liip.ch
 */
'use strict';

var React = require('react-native');
var {
  div,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

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
var App = React.createClass({
  render: function() {
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
});

// Styles
var styles = StyleSheet.create({
  // Style the main app component.
  container: {
    flex: 1,
  },

  // Style the whole content below the title bar.
  itemWrapper: {
    backgroundColor: 'transparent',
    paddingTop: 64,
  },
});

AppRegistry.registerComponent('guess_the_liiper', () => App);
