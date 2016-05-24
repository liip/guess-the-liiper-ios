/**
 * @flow
 */

var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
var LoginView = require('./LoginView');
var TimerMixin = require('react-timer-mixin');
var HighscoreScreen = require('../Highscore/HighscoreScreen');
var React = require('react-native');
var {View} = React;
var WebLoginView = require('./WebLoginView');

class LoginScreen extends Component {
  // mixins: [TimerMixin],
  //
  // statics: {
  //   title: 'Guess the Liiper'
  // },

  componentDidMount() {
    this.testAuth();
  }

  getInitialState() {
    return {
      loggedIn: false,
      showWebView: false,
      loading: true,
      authUrl: null,
    };
  }

  render() {
    var webView;
    if (this.state.authUrl) {
      webView = (
        <WebLoginView
          url={this.state.authUrl}
          onUrlChange={this.onWebLoginUrlChange} />
      );

      if (this.state.showWebView) {
        return webView;
      }
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
  }

  onLoginPressed() {
    return GuessApi.authUrl()
      .then((authUrl) => {
        this.setState({
          authUrl: authUrl,
          loading: true
        });
      })
      .catch(console.error);
  }

  onHighscorePressed() {
    this.props.navigator.push({
      title: HighscoreScreen.title,
      component: HighscoreScreen,
      backButtonTitle: 'Back',
    });
  }

  onLogoutPressed() {
    return GuessApi.logout()
      .then(() => this.setState({authUrl: null, loggedIn: false}));
  }

  onPlayPressed () {
    var PlayScreen = require('../Play/PlayScreen');
    this.props.navigator.push({
      title: PlayScreen.title,
      component: PlayScreen,
      backButtonTitle: 'Back',
    });
  }

  onWebLoginUrlChange(state: Object) {
    // Show the webview in case we don't get an answer within x sec.
    this.whenInactiveShowWebview();

    if (this.isUserActionRequired(state)) {
      this.clearTimeout(this.timeout);
      return this.setState({showWebView: true});
    }

    if (GuessApi.isStartPage(state.url)) {
      this.clearTimeout(this.timeout);
      this.setState({authUrl: null, showWebView: false});
      this.testAuth();
    }
  }

  isUserActionRequired(state) {
    return GuessApi.isRequestForPermission(state.title)
        || GuessApi.isSignIn(state.title);
  }

  whenInactiveShowWebview() {
    if (this.timeout) {
      this.clearTimeout(this.timeout);
    }

    this.timeout = this.setTimeout(() => {
      this.setState({showWebView: true});
    }, 3000);
  }

  testAuth() {
    return GuessApi.testAuth()
      .then(loggedIn => this.setState({
        loggedIn: loggedIn,
        loading: false
      }));
  }

}

module.exports = LoginScreen;
