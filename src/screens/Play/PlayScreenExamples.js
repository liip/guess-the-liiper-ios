/* @flow */
'use strict';

var React = require('react-native');
var { StyleSheet, Text } = React;
var GuessApi = require('../../GuessApi');
var PlayView = require('./PlayView');

var resultMock = {
  "gameid": "4365c3c9315caed5fe43707e2c6ed35e",
  "correct": true,
  "resultid": "6dc9dc5408d979d5f2d39f10fe4feb80",
  "selectedResultid": "d289bea0d3c084423359d1619b40a501",
  "round": 1,
  "points": 80,
  "finish": false
};

var defaults = {
  game: {
    "gameid": "4365c3c9315caed5fe43707e2c6ed35e",
    "picture": "http://guess.liip.ch/picture/44/200/true/image.png",
    "persons": [
      {
        "name": "Christian Stocker",
        "resultId": "d289bea0d3c084423359d1619b40a501"
      }, {
        "name": "Stefan Oderbolz",
        "resultId": "6dc9dc5408d979d5f2d39f10fe4feb80"
      }, {
        "name": "Dorian Villet",
        "resultId": "355d153ac90a0a9db0073b551de50c92"
      }, {
        "name": "Lukas Kahwe Smith",
        "resultId": "bb1edc097f2068634c49dc2e4339ee29"
      }]
  },
  gameResults: [],
  onGuess: () => {
  },
  onNext: () => {
  },
  showResult: false,
  showAnswer: false
};

var PlayingNoAnswer = React.createClass({
  render: function () {
    return (
      <PlayView {...defaults} />
    );
  },
});

var PlayingWrongAnswer = React.createClass({
  render: function () {
    var gameResult = {};
    Object.assign(gameResult, resultMock);
    gameResult.correct = false;
    console.log(gameResult);
    return (
      <PlayView {...defaults} gameResults={[gameResult]} showResult={true} />
    );
  },
});

var PlayingRightAnswer = React.createClass({
  render: function () {
    var gameResult = {};
    Object.assign(gameResult, resultMock);
    gameResult.correct = false;
    gameResult.selectedResultid = "6dc9dc5408d979d5f2d39f10fe4feb80";
    return (
      <PlayView {...defaults} gameResults={[gameResult]} showResult={true} />
    );
  },
});

module.exports = {
  PlayingNoAnswer: PlayingNoAnswer,
  PlayingWrongAnswer: PlayingWrongAnswer,
  PlayingRightAnswer: PlayingRightAnswer,
};
