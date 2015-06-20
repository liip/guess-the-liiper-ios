'use strict';

var React = require('react-native');
var GuessApi = require('../../GuessApi');
var PlayView = require('./PlayView');
var PlayBackground = require('./PlayBackground');

var PlayScreen = React.createClass({

  componentDidMount: function() {
    return GuessApi.play().then(this.createGame);
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
      return this.renderLoading();
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

  renderLoading: function() {
    return (
      <PlayBackground />
    );
  },

  onGuess: function(resultid, time) {
    return GuessApi.check(this.state.game, resultid, time)
      .then((gameResult) => {
        this.setState({
          gameResults: this.state.gameResults.concat(gameResult),
          showAnswer: true
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
        this.setState({game: game, loaded: true, showAnswer: false})
      })
      .catch(console.error);
  },

});

module.exports = PlayScreen;
