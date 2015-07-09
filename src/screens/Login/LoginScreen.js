/**
 * @flow
 */

var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
var LoginView = require('./LoginView');
var PlayScreen = require('../Play/PlayScreen');
var HighscoreScreen = require('../Highscore/HighscoreScreen');
var React = require('react-native');
var WebLoginView = require('./WebLoginView');

var LoginScreen = React.createClass({

  componentDidMount: function() {
    this.testAuth();
  },

  getInitialState: function() {
    return {
      loggedIn: false,
      loading: true
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
        loading={this.state.loading}
        onLoginPressed={this.onLoginPressed}
        onHighscorePressed={this.onHighscorePressed}
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
        this.setState({
          authUrl: authUrl,
          loading: true
        });
      })
      .catch(console.error);
  },

  onHighscorePressed: function() {
    this.props.navigator.push({
      title: 'Highscore',
      component: HighscoreScreen,
      backButtonTitle: 'Back',
      passProps: {topExampleRoute: this.props.topExampleRoute || this.props.route},
    });
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
      .then(loggedIn => this.setState({
        loggedIn: loggedIn,
        loading: false
      }));
  },

});

module.exports = LoginScreen;
