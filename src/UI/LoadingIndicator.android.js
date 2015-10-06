var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');
var Variables = require('../Variables');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var LoadingIndicator = React.createClass({
  render: function() {
    return (
        <ProgressBar style={styles.loadingIndicator} />
    );
  },
});

// Styles
var styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
});

module.exports = LoadingIndicator;
