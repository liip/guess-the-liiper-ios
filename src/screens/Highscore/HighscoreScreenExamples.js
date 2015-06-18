var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
var React = require('react-native');
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


