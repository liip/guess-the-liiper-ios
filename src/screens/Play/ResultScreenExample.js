/* @flow */
'use strict';

var React = require('react-native');
var { StyleSheet, Text } = React;
var GuessApi = require('../../GuessApi');
var ResultView = require('./ResultView');

var resultMock = {
  result: {
    level: 1,
    gotPoints: 730,
    maxPoints: 1000,
    playAgain: "/level1/play"
  },
  betterResults: 3
};

var ResultScreenExample = React.createClass({
  render: function () {
    return (
      <ResultView score={resultMock} />
    );
  },
});

module.exports = ResultScreenExample;
