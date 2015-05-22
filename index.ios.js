/**
 * Guess the Liiper React Native App
 * https://guess.liip.ch
 */
'use strict';

var React = require('react-native');
var {
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
var {LoggedIn, LoggedOut} = require('./src/screens/Login/LoginScreenExamples');

/**
 * @type {ReactElement} Component to display when the app starts.
 */
var StartComponent = LoggedOut;

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
          title: 'Guess the Liiper',
          component: StartComponent,
        }}
        itemWrapperStyle={styles.itemWrapper}
      />
    );
  }
});

// Styles
var styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 0
  },
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('guess_the_liiper', () => App);
