var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
var React = require('react-native');
var {Text} = React;
var HighscoreView = require('./HighscoreView');

var HighscoreScreen = React.createClass({
  statics: {
    title: 'Highscore',
    description: 'See the best.'
  },

  componentDidMount: function() {
    this.setState({
      highscores: GuessApi.highscore().resultsMonth,
      loaded: true
    });
  },

  getInitialState: function() {
    return {
      loaded: false,
      highscores: {}
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return <Text>Loading</Text>
    }

    return (
      <HighscoreView highscores={this.state.highscores} />
    );
  },

  onTabSwitch: function() {

  },


});

module.exports = HighscoreScreen;
