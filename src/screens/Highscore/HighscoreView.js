var {
  Button,
  Headline,
  FaceGridBackground
} = require('../../GuessUI');
import React, { Component } from 'react'
import {
  ActivityIndicatorIOS,
  View,
  ListView,
  Text,
  Image,
  StyleSheet
} from 'react-native'
var Variables = require('../../Variables');

var HighscoreTabView = require('./HighscoreTabView');
var HighscoreListView = require('./HighscoreListView');

var HighscoreView = React.createClass({

  propTypes: {
    highscore: React.PropTypes.object.isRequired,
    onTabSwitch: React.PropTypes.func.isRequired
  },

  renderLoading: function() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS />
      </View>
    );
  },

  render: function() {
    var component;
    if (this.props.loaded) {
      console.log('rendering')
      component = (
          <HighscoreTabView onTabSwitch={this.props.onTabSwitch} >
            <HighscoreListView selected_tab={this.props.selected_tab} highscore={this.props.highscore} />
          </HighscoreTabView>
      );
    } else {
      console.log('rendering')
      component = this.renderLoading();
    }

    return (
      <FaceGridBackground>
        <View style={styles.container}>
          {component}
        </View>
      </FaceGridBackground>
    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});

module.exports = HighscoreView;
