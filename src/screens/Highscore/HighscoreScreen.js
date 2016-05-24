var GuessApi = require('../../GuessApi');
var {Button} = require('../../GuessUI');
import React, { Component } from 'react'
var {Text} = React;
var HighscoreView = require('./HighscoreView');

var HighscoreScreen = React.createClass({
  statics: {
    title: 'Highscore',
  },

  componentDidMount: function() {
    GuessApi.highscore()
        .then((highscore) => {
          this.setState({
            loaded: true,
            highscore: highscore,
          });
        })
        .catch((error) => console.log(error));
  },

  getInitialState: function() {
    return {
      loaded: false,
      selected_tab: 'resultsMonth',
      highscore: {}
    }
  },

  render: function() {
    return (
      <HighscoreView
          {...this.state}
          onTabSwitch={this.onTabSwitch} />
    );
  },

  onTabSwitch: function(selected_tab) {
    this.setState({selected_tab});
  },


});

module.exports = HighscoreScreen;
