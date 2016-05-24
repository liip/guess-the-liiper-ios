/* @flow */
console.log('LoginView');
import React, { Component } from 'react'
var Variables = require('../../Variables');
import { StyleSheet, LayoutAnimation, View, Text, Image, ActivityIndicatorIOS } from 'react-native';
var { FaceGridBackground, ScrollView, Button, Link } = require('../../GuessUI');

var LoginView = React.createClass({

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onLoginPressed: React.PropTypes.func.isRequired,
    onHighscorePressed: React.PropTypes.func.isRequired,
    onLogoutPressed: React.PropTypes.func.isRequired,
    onPlayPressed: React.PropTypes.func.isRequired,
  },

  animation: {
    duration: 700,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.4,
    },
  },

  render: function () {
    LayoutAnimation.configureNext(this.animation);

    var component;
    if (this.props.loading) {
      component = <ActivityIndicatorIOS style={styles.loadingIndicator} />;
    } else if (this.props.loggedIn) {
      component = this.renderLoggedInButtons();
    } else {
      component = this.renderLoggedOutButtons();
    }

    return (
      <FaceGridBackground>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} resizeMode="contain" source={{ uri: 'GuessLogo', isStatic: true }} />
            <View style={styles.hidden}>{ this.props.children }</View>
            { component }
          </View>
        </View>
      </FaceGridBackground>
    );
  },

  renderLoggedInButtons: function() {
    return (
      <View style={styles.containerButtons}>
        <Button style={styles.buttonPlay} onPress={this.props.onPlayPressed}>
          Play
        </Button>
        <Button style={styles.buttonPlay} onPress={this.props.onHighscorePressed}>
          Highscore
        </Button>
        <Link onPress={this.props.onLogoutPressed}>
          Logout
        </Link>
      </View>
    );
  },

  renderLoggedOutButtons: function() {
    return (
      <View style={styles.containerButtons}>
        <Text style={styles.loginText}>
          Improve your knowledge about all Liipers.
        </Text>
        <Text style={styles.loginText}>
          Get started by logging in with your liip account.
        </Text>
        <Button style={styles.buttonLogin} onPress={this.props.onLoginPressed}>
          Sign in with Google
        </Button>
      </View>
    );
  },

});

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Variables.HEADERHEIGHT,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Variables.WHITERGBA80,
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
  logo: {
    flex: 2,
    width: 250,
    height: 282,
    alignSelf: 'center',
    marginBottom: 50,
  },
  loginText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    textAlign: 'center'
  },
  loadingIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
  containerButtons: {
    alignItems: 'stretch',
  },
  buttonLogin: {
    marginTop: 20
  },
  buttonLogout: {
  },
  buttonPlay: {
  },
  hidden: {
    width: 0,
    height: 0
  },
});

console.log('LoginView');

module.exports = LoginView;
