/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Animation,
  AppRegistry,
  Image,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView,
} = React;

var {
  Button,
  Grid,
  ProgressBarAnimation,
} = require('./GuessUI');

var GuessApi = require('./GuessApi');


// Timeout in ms.
var PLAYER_TIMEOUT = 10000;

var LoginScreenContainer = React.createClass({

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
      return <WebView
        url={this.state.authUrl}
        backButtonEnabled={true}
        renderLoading={this.renderLoading}
        renderError={this.renderLoading}
        onNavigationStateChange={this.onNavigationStateChange} />;
    }

    return <LoginScreen {...this.props}
              loggedIn={this.state.loggedIn}
              onLogin={this.onLogin}
              onLogout={this.onLogout} />;
  },

  renderLoading: function() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicatorIOS />
      </View>
    );
  },

  renderError: function(errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTextTitle}>
        Error loading page
        </Text>
        <Text style={styles.errorText}>
          {'Domain: ' + errorDomain}
        </Text>
        <Text style={styles.errorText}>
          {'Error Code: ' + errorCode}
        </Text>
        <Text style={styles.errorText}>
          {'Description: ' + errorDesc}
        </Text>
      </View>
    );
  },

  onLogin: function() {
    return GuessApi.authUrl()
      .then((authUrl) => {
        this.setState({authUrl: authUrl});
      })
      .catch(console.error);
  },

  onLogout: function() {
    return GuessApi.logout()
      .then(() => this.setState({authUrl: null, loggedIn: false}));
  },

  onNavigationStateChange: function(state) {
    if (GuessApi.isStartPage(state.url)) {
      this.setState({authUrl: null});
      this.testAuth();
    }
  },

  testAuth: function() {
    return GuessApi.testAuth().then(loggedIn => this.setState({loggedIn: loggedIn}));
  }
});

var LoginScreen = React.createClass({

  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        {this.props.loggedIn ? this.renderLogoutButton() : this.renderLoginButton() }

        {this.props.loggedIn && <Button onPress={this.onPlayPressed} style={styles.loginButton}>
          Play
        </Button>}
      </ScrollView>
    );
  },

  renderLoginButton: function() {
    return (
      <Button onPress={this.props.onLogin} style={styles.loginButton}>
        Login with Google
      </Button>
    )
  },

  renderLogoutButton: function() {
    return (
      <Button onPress={this.props.onLogout} style={styles.loginButton}>
        Logout
      </Button>
    )
  },

  onPlayPressed: function() {
    this.props.navigator.push({
      title: 'Play',
      component: PlayScreenContainer,
      backButtonTitle: 'Custom Back',
      passProps: {topExampleRoute: this.props.topExampleRoute || this.props.route},
    });
  },
});


var PlayScreenContainer  = React.createClass({

  componentDidMount: function() {
    return GuessApi.play().then(this.createGame);
  },

  getInitialState: function() {
    return {
      loaded: false,
      gameResults: [],
      showResult: false
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return <PlayScreen {...this.props}
              game={this.state.game}
              gameResults={this.state.gameResults}
              onGuess={this.onGuess}
              onNext={this.onNext}
              playerTimeout={PLAYER_TIMEOUT}
              showResult={this.state.showResult}
    />
  },

  renderLoading: function() {
    return (
      <Text>Loading...</Text>
    );
  },

  onGuess: function(resultid, time) {
    return GuessApi.check(this.state.game, resultid, time)
      .then((gameResult) => {
        this.setState({
          gameResults: this.state.gameResults.concat(gameResult),
          showResult: true
        })
      })
      .catch(console.error);
  },

  onNext: function() {
    this.createGame();
  },

  createGame: function() {
    return GuessApi.create()
      .then((game) => {
        this.setState({game: game, loaded: true, showResult: false})
      })
      .catch(error => {
        debugger;
      });
  },

});

var PlayScreen = React.createClass({

  propTypes: {
    game: React.PropTypes.object.isRequired,
    gameResults: React.PropTypes.array.isRequired,
    playerTimeout: React.PropTypes.number.isRequired,
    onGuess: React.PropTypes.func.isRequired,
    onNext: React.PropTypes.func.isRequired,
    showResult: React.PropTypes.bool.isRequired,
  },

  componentDidMount: function() {
    Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {scaleXY: [1, 1]});
    Animation.startAnimation(this.refs['this'], 100, 0, 'easeInOutQuad', {opacity: 1});
  },

  render: function() {
    var game = this.props.game;

    return (
      <View ref="this" style={styles.container}>
        <Image style={styles.picture} source={{uri: game.picture }}/>

        {this.renderProgressOrContinue()}

        <Grid amountInRow={2}>
          {this.renderButtons(game.persons)}
        </Grid>
      </View>
    );
  },

  renderProgressOrContinue: function() {
    if (this.props.showResult) {
      return <Button onPress={this.props.onNext}>next</Button>;
    }

    return <ProgressBarAnimation duration={this.props.playerTimeout} onFinish={this.onTimeUp}/>;
  },

  renderButtons: function(persons) {
    return persons.map(person =>
        <Button style={this.getButtonStyle(person)} onPress={() => this.onButtonPressed(person.resultId) }>
          {person.name}
        </Button>
    );
  },

  getButtonStyle: function(person) {
    if (!this.props.showResult) {
      return styles.buttonDefault;
    }

    var result = this.props.gameResults[this.props.gameResults.length - 1];

    // Todo: result.isPerson(person)
    if (result.resultid == person.resultId) {
        return styles.buttonCorrect;
    }

    // Todo: result.wronglySelected(person)
    if (!result.correct && result.selectedResultid == person.resultId) {
      return styles.buttonWrong;
    }

    return styles.buttonDefault;
  },

  onButtonPressed: function(resultid) {
    if (this.props.showResult) { return; }

    this.props.onGuess(resultid, this.props.playerTimeout);
  },

  onTimeUp: function() {
    if (this.props.showResult) { return; }

    this.props.onGuess(null, this.props.playerTimeout);
  },
});

var App = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Guess the Liiper',
          component: LoginScreenContainer,
          passProps: {
            test: 'er'
          },
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor='#008888'
      />
    );
  }
});

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    paddingTop: 64
  },
  itemWrapper: {
  },
  loadingView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginButton: {
    padding: 10,
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
    paddingTop: 50,
    alignSelf: 'center',
  },
  buttonDefault: {
    backgroundColor: 'rgba(255,255,255,0.8)}',
  },
  buttonCorrect: {
    backgroundColor: 'rgba(0,255,0,0.8)',
  },
  buttonWrong: {
    color: 'white',
    backgroundColor: 'rgba(255,0,0,0.8)',
  },
  instructions: {
    paddingTop: 10,
    textAlign: 'left',
    color: '#ff0000',
  },
});

AppRegistry.registerComponent('guess_the_liiper', () => App);
