/* @flow */
var React = require('react-native');
var Variables = require('../../Variables');
var { StyleSheet, View, Text, Image, ActivityIndicatorIOS } = React;
var { ScrollView, Button } = require('../../GuessUI');

var LoginView = React.createClass({

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onLoginPressed: React.PropTypes.func.isRequired,
    onHighscorePressed: React.PropTypes.func.isRequired,
    onLogoutPressed: React.PropTypes.func.isRequired,
    onPlayPressed: React.PropTypes.func.isRequired,
  },

  renderLoggedInButtons: function() {
    return (
      <View>
        <Button style={styles.buttonPlay} onPress={this.props.onPlayPressed}>
          Play
        </Button>
        <Button style={styles.buttonPlay} onPress={this.props.onHighscorePressed}>
          Highscore
        </Button>
        <Button style={styles.buttonLogout} onPress={this.props.onLogoutPressed}>
          Logout
        </Button>
      </View>
    );
  },

  renderLoggedOutButtons: function() {
    return (
      <View>
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

  render: function () {
    var component;

    if (this.props.loading) {
      component = <ActivityIndicatorIOS />;
    } else if (this.props.loggedIn) {
      component = this.renderLoggedInButtons();
    } else {
      component = this.renderLoggedOutButtons();
    }

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image style={styles.logo} source={{ uri: 'GuessLogo', isStatic: true }} />
          { component }
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
    marginTop: Variables.HEADERHEIGHT
  },
  logo: {
    width: 250,
    height: 282,
    alignSelf: 'center',
    marginBottom: 50
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Variables.WHITERGBA80,
    margin: 10,
    padding: 20,
    borderRadius: 5
  },
  loginText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    textAlign: 'center'
  },
  containerButtons: {
    flex: 1
  },
  buttonLogin: {
    marginTop: 20
  },
  buttonLogout: {
  },
  buttonPlay: {
  },
});

module.exports = LoginView;
