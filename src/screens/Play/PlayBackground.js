'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
} = React;

var {
  FaceGridBackground
} = require('../../GuessUI');

var PlayBackground = React.createClass({
    render: function () {
        return (
            <FaceGridBackground>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </FaceGridBackground>
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
  }
});

module.exports = PlayBackground;