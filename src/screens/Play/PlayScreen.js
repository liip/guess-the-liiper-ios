/* @flow */
'use strict';

var React = require('react-native');
var {ActivityIndicatorIOS} = React;
var GuessApi = require('../../GuessApi');
var PlayView = require('./PlayView');
var PlayLoadingView = require('./PlayLoadingView');
var ResultScreen = require('./ResultScreen');
var PlayBackground = require('./PlayBackground');
import type {GameResult} from '../../GuessDomain';

var PlayScreen = React.createClass({
  statics: {
    title: 'Play',
  },

  componentDidMount: function() {
    GuessApi
      .play()
      .then(this.createGame);
  },

  getInitialState: function() {
    return {
      loaded: false,
      gameResults: [],
      showAnswer: false
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return <PlayLoadingView />;
    }

    return (
      <PlayView
        game={this.state.game}
        gameResults={this.state.gameResults}
        onGuess={this.onGuess}
        onNext={this.onNext}
        showAnswer={this.state.showAnswer}
      />
    );
  },

  onGuess: function(resultid :string, time :number) {
    return GuessApi
      .check(this.state.game, resultid, time)
      .then((gameResult) => {
        this.setState({
          gameResults: this.state.gameResults.concat(gameResult),
          showAnswer: true
        })
      })
      .catch(console.error);
  },

  /**
   * When a user requests the next guess.
   *
   * If the game is finished, the user will be redirected to a result screen.
   */
  onNext: function() {
    if (this.state.gameResults[this.state.gameResults.length - 1].finish) {
        return this.props.navigator.replace({
          title: ResultScreen.title,
          component: ResultScreen,
          backButtonTitle: 'Back',
        });
    }

    this.createGame();
  },

  createGame: function() {
    return GuessApi
      .create()
      .then((game) => {
        this.setState({
          game: game,
          loaded: true,
          showAnswer: false
        })
      })
      .catch(console.error);
  },

});

module.exports = PlayScreen;
