/* @flow */
'use strict';

import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native';
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
