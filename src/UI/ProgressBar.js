import React, { Component } from 'react'
var Variables = require('../Variables');
import {
  StyleSheet,
  View,
} from 'react-native';

var ProgressBar = React.createClass({
  propTypes: {
    /**
     * Percentage value from 0 to 100.
     */
    complete: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
        <View style={styles.progressBar}>
          <View style={[
          styles.progressBar,
          styles.progressBarCompleted,
          {width: this.props.complete}
        ]} />
        </View>
    );
  },
});

// Styles
var styles = StyleSheet.create({
  progressBar: {
    width: 100,
    height: 20,
    margin: 15,
    backgroundColor: 'silver',
    alignSelf: 'center',
  },
  progressBarCompleted: {
    margin: 0,
    backgroundColor: 'green',
    alignSelf: 'auto',
    width: 60,
  }
});

module.exports = ProgressBar;
