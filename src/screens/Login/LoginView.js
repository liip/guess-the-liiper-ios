'use strict';

var React = require('react-native');
var Variables = require('../../Variables');
var { StyleSheet, View, Text } = React;
var { ScrollView, Button } = require('../../GuessUI');

var LoginView = React.createClass({

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    onLoginPressed: React.PropTypes.func.isRequired,
    onLogoutPressed: React.PropTypes.func.isRequired,
    onPlayPressed: React.PropTypes.func.isRequired,
  },

  render: function () {
    if (this.props.loggedIn) {
      return (
        <View style={styles.container}>
          <View style={styles.containerButtons}>
            <Button style={styles.buttonLogout} onPress={this.props.onLogoutPressed}>
              Logout
            </Button>

            <Button style={styles.buttonPlay} onPress={this.props.onPlayPressed}>
              Play and rule
            </Button>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Improve your knowledge about all Liipers.
            {'\n'}{'\n'}
            Get started by logging in with your liip account.
          </Text>
          <Button style={styles.buttonLogin} onPress={this.props.onLoginPressed}>
            Login with Google
          </Button>
        </View>
      </View>
    );
  },
});

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Variables.WHITERGBA80,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 14,
    marginBottom: 10,
  },
  containerButtons: {
    flex: 1
  },
  buttonLogin: {
  },
  buttonLogout: {
  },
  buttonPlay: {
  },
});

module.exports = LoginView;
