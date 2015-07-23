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

  statics: {
    title: 'Guess the Liiper'
  },

  componentDidMount: function() {
    this.testAuth();
  },

  getInitialState: function() {
    return {
      loggedIn: false,
      showWebView: false,
      loading: true
    };
  },

  render: function() {
    var webView;
    if (this.state && this.state.authUrl) {
      webView = (
        <WebLoginView
          url={this.state.authUrl}
          onUrlChange={this.onWebLoginUrlChange} />
      );
    }

    if (this.state.showWebView) {
      return webView;
    }

    return (
      <LoginView
        loggedIn={this.state.loggedIn}
        loading={this.state.loading}
        onLoginPressed={this.onLoginPressed}
        onHighscorePressed={this.onHighscorePressed}
        onLogoutPressed={this.onLogoutPressed}
        onPlayPressed={this.onPlayPressed}>
        {webView}
      </LoginView>
    );
  },

  onLoginPressed: function() {
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
      title: HighscoreScreen.title,
      component: HighscoreScreen,
      backButtonTitle: 'Back',
    });
  },

  onLogoutPressed: function() {
    return GuessApi.logout()
      .then(() => this.setState({authUrl: null, loggedIn: false}));
  },

  onPlayPressed: function () {
    this.props.navigator.push({
      title: PlayScreen.title,
      component: PlayScreen,
      backButtonTitle: 'Back',
    });
  },

  onWebLoginUrlChange: function(state: Object) {
    // Show the webview in case we don't get an answer within x sec.
    this.timeout = setTimeout(() => {
      return this.setState({showWebView: true})
    }, 10000);

    if (GuessApi.isRequestForPermission(state.title)
     || GuessApi.isSignIn(state.title)) {
      clearTimeout(this.timeout);
      return this.setState({showWebView: true})
    }

    if (GuessApi.isStartPage(state.url)) {
      this.setState({authUrl: null, showWebView: false});
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
