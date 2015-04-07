'use strict';

var React = require('react-native');
var { StyleSheet } = React;
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
        <ScrollView>
          <Button onPress={this.props.onLogoutPressed}>
            Logout
          </Button>

          <Button onPress={this.props.onPlayPressed}>
            Play
          </Button>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Button onPress={this.props.onLoginPressed}>
          Login with Google
        </Button>
      </ScrollView>
    );
  },

});

module.exports = LoginView;
