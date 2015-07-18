/* @flow */
'use strict';

var React = require('react-native');
var { ActivityIndicatorIOS, StyleSheet, View } = React;
var PlayBackground = require('./PlayBackground');

var PlayLoadingView = React.createClass({

  render() {
    return (
        <PlayBackground>
          <View style={styles.loadingContainer}>
            <ActivityIndicatorIOS />
          </View>
        </PlayBackground>
    );
  }
});

var styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = PlayLoadingView;
