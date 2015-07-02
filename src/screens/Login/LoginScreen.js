/**
 * @flow
 */

var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
var LoginView = require('./LoginView');
var PlayScreen = require('../Play/PlayScreen');
var React = require('react-native');
var WebLoginView = require('./WebLoginView');

var LoginScreen = React.createClass({

  componentDidMount: function() {
    this.testAuth();
  },

  getInitialState: function() {
    return {
      loggedIn: false,
    };
  },

  render: function() {
    if (this.state && this.state.authUrl) {
      return (
        <WebLoginView
          url={this.state.authUrl}
          onUrlChange={this.onWebLoginUrlChange} />
      );
    }

    return (
      <LoginView
        loggedIn={this.state.loggedIn}
        onLoginPressed={this.onLoginPressed}
        onLogoutPressed={this.onLogoutPressed}
        onPlayPressed={this.onPlayPressed} />
    );
  },

  onLoginPressed: function() {
    this.props.navigator.replace({
      title: 'Login',
      component: LoginScreen,
    });

    return GuessApi.authUrl()
      .then((authUrl) => {
        this.setState({authUrl: authUrl});
      })
      .catch(console.error);
  },

  onLogoutPressed: function() {
    return GuessApi.logout()
      .then(() => this.setState({authUrl: null, loggedIn: false}));
  },

  onPlayPressed: function () {
    this.props.navigator.push({
      title: 'Play',
      component: PlayScreen,
      backButtonTitle: 'Back',
      passProps: {topExampleRoute: this.props.topExampleRoute || this.props.route},
    });
  },

  onWebLoginUrlChange: function(state: Object) {
    if (GuessApi.isStartPage(state.url)) {
      this.setState({authUrl: null});
      this.testAuth();
    }
  },

  testAuth: function() {
    return GuessApi.testAuth()
      .then(loggedIn => this.setState({loggedIn: loggedIn}));
  },

});

module.exports = LoginScreen;
