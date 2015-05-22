'use strict';

var React = require('react-native');
var { StyleSheet, View } = React;
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
        <Button style={styles.buttonLogin} onPress={this.props.onLoginPressed}>
          Login with Google
        </Button>
      </View>
    );
  },
});

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
