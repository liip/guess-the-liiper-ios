/* @flow */
'use strict';

var React = require('react-native');
var Variables = require('../../Variables');
var {
  StyleSheet,
  View,
} = React;

var {
  Button,
} = require('../../GuessUI');

var PlayBackground = require('./PlayBackground');

var ResultView = React.createClass({

  propTypes: {
    score: React.PropTypes.object.isRequired,
    onPlayAgain: React.PropTypes.fun.isRequired,
    onHighscore: React.PropTypes.fun.isRequired,
  },

  render: function() {
    return (
      <PlayBackground>
      </PlayBackground>
    );
  },
});


var styles = StyleSheet.create({
});

module.exports = ResultView;
