var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
import React, { Component } from 'react'
var HighscoreScreen = require('./HighscoreScreen');

var Highscore = React.createClass({

  render: function() {
    return (
      <HighscoreScreen />
    );
  },

});

module.exports = {
  Highscore: Highscore,
};
