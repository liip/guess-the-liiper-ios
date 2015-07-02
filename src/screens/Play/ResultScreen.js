/* @flow */
'use strict';

var React = require('react-native');
var GuessApi = require('../../GuessApi');
var ResultView = require('./ResultView');
var PlayBackground = require('./PlayBackground');

var ResultScreen = React.createClass({

  componentDidMount: function() {
    GuessApi
      .lastScoreResult()
      .then(score => this.setState({loaded: true, score}));
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
      <ResultView
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

  onPlayAgain: function() {
    // todo: redirect
  },

  onHighscore: function() {
    // todo: redirect
  },

});

module.exports = ResultScreen;
