/* @flow */
'use strict';

import React, { Component } from 'react'
var GuessApi = require('../../GuessApi');
var ResultView = require('./ResultView');
var PlayLoadingView = require('./PlayLoadingView');
var HighscoreScreen = require('../Highscore/HighscoreScreen');
var PlayBackground = require('./PlayBackground');

var ResultScreen = React.createClass({
  statics: {
    title: 'Result',
  },

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
      return <PlayLoadingView />
    }

    return (
      <ResultView
        score={this.state.score}
        onPlayAgain={this.onPlayAgain}
        onHighscore={this.onHighscore}
      />
    );
  },

  onPlayAgain: function() {
    var PlayScreen = require('./PlayScreen');
    this.props.navigator.replace({
      title: PlayScreen.title,
      component: PlayScreen,
      backButtonTitle: 'Back',
    });
  },

  onHighscore: function() {
    this.props.navigator.push({
      title: HighscoreScreen.title,
      component: HighscoreScreen,
      backButtonTitle: 'Back',
    });
  },

});

module.exports = ResultScreen;
