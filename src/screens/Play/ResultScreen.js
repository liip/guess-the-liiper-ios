'use strict';

var React = require('react-native');
var GuessApi = require('../../GuessApi');
var ResultView = require('./ResultView');
var PlayBackground = require('./PlayBackground');

var ResultScreen = React.createClass({

  componentDidMount: function() {
    // todo: get game id
    return GuessApi.lastScoreResult().then((score) => this.setState({score, loaded: true}));
  },

  getInitialState: function() {
    return {
      loaded: false,
      score: {},
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return (
      <ResultViw
        score={this.state.score}
        onPlayAgain={this.onPlayAgain}
        onHighscore={this.onHighscore}
      />
    );
  },

  renderLoading: function() {
    return (
      <PlayBackground />
    );
  },

  onPlayAgain: function(resultid, time) {
    // todo: redirect
  },

  onHighscore: function() {
    // todo: redirect
  },

});

module.exports = ResultScreen;
