'use strict';
var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Text,
  View,
  WebView,
  StyleSheet,
} = React;

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    onUrlChange: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <WebView
        url={this.props.url}
        backButtonEnabled={true}
        renderLoading={this.renderLoading}
        renderError={this.renderError}
        onNavigationStateChange={this.props.onUrlChange} />
    );
  },

  renderLoading: function() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicatorIOS />
      </View>
    );
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
    );
  },

});

// Styles
var styles = StyleSheet.create({
  loadingView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
