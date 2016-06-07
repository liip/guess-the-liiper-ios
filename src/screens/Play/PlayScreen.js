/* @flow */
'use strict';

import React, { Component } from 'react'
import {ActivityIndicatorIOS} from 'react-native'
var GuessApi = require('../../GuessApi')
var PlayView = require('./PlayView')
var PlayLoadingView = require('./PlayLoadingView')
var PlayBackground = require('./PlayBackground')
import type {GameResult} from '../../GuessDomain'

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

  onGuess: function(resultid :string, timeInMs :number) {
    return GuessApi
      .check(this.state.game, resultid,  Math.max(1, Math.round(timeInMs / 1000)))
      .then((gameResult) => {
        this.setState({
          gameResults: this.state.gameResults.concat(gameResult),
          showAnswer: true
        })
      })
      .catch((err) => {
        console.warn(err)
      });
  },

  /**
   * When a user requests the next guess.
   *
   * If the game is finished, the user will be redirected to a result screen.
   */
  onNext: function() {
    if (this.state.gameResults[this.state.gameResults.length - 1].finish) {
        var ResultScreen = require('./ResultScreen');
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
      .catch((err) => {
        console.warn(err)
      });
  },

});

console.log('PlayScreenEnd')

module.exports = PlayScreen;
