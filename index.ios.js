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
  Text,
} = React;

var LoginScreen = require('./src/screens/Login/LoginScreen');
var PlayScreen = require('./src/screens/Play/PlayScreen');

var App = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Guess the Liiper',
          component: LoginScreen,
        }}
        itemWrapperStyle={styles.itemWrapper}
      />
    );
  }
});

// Styles
var styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 64,
  },
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('guess_the_liiper', () => App);
