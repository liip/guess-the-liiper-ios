/* @flow */
'use strict';

import React, { Component } from 'react'
import { ActivityIndicatorIOS, StyleSheet, View } from 'react-native';
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
