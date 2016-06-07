import React, { Component } from 'react'
import LoginView from './LoginView'
import {
  ActivityIndicatorIOS,
  Text,
  View,
  WebView,
  StyleSheet,
} from 'react-native'

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    onUrlChange: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <WebView
        source={{uri: this.props.url}}
        backButtonEnabled={true}
        renderLoading={this.renderLoading}
        renderError={this.renderError}
        onNavigationStateChange={this.props.onUrlChange} />
    )
  },

  renderLoading: function() {
    return (
      <LoginView loading={true}/>
    )
  },

  renderError: function(errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTextTitle}>
        Error loading page
        </Text>
        <Text style={styles.errorText}>
          {'Domain: ' + errorDomain}
        </Text>
        <Text style={styles.errorText}>
          {'Error Code: ' + errorCode}
        </Text>
        <Text style={styles.errorText}>
          {'Description: ' + errorDesc}
        </Text>
      </View>
    )
  },

})

// Styles
var styles = StyleSheet.create({
  loadingView: {
    marginTop: 65,
    backgroundColor: 'rgba(50,50,50,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
