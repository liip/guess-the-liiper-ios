/* @flow */
'use strict';

var React = require('react-native');
var Variables = require('../../Variables');
var {
  StyleSheet,
  View,
  Text,
} = React;

var {
  Button,
} = require('../../GuessUI');

var PlayBackground = require('./PlayBackground');

var ResultView = React.createClass({

  propTypes: {
    score: React.PropTypes.object.isRequired,
    onPlayAgain: React.PropTypes.func.isRequired,
    onHighscore: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <PlayBackground>
        <View style={styles.resultContainer}>
          <Text style={styles.resultPoints}>
            {this.props.score.result.gotPoints}
          </Text>
          <Text style={styles.resultMaxpoints}>
            out of {this.props.score.result.maxPoints} points
          </Text>
        </View>
        <View style={styles.resultInfoContainer}>
          <Text style={styles.resultInfoText}>
            You are under the TOP {this.props.score.betterResults}
            {'\n'}
            Try again to get the throne!
          </Text>
        </View>
        <View>
          <View style={styles.resultActionsContainer}>
            <Button style={styles.buttonLight} onPress={this.props.onHighscore}>
              Highscore
            </Button>
            <Button onPress={this.props.onPlayAgain}>
              Play Again
            </Button>
          </View>
        </View>
      </PlayBackground>
    );
  },
});


var styles = StyleSheet.create({
  resultContainer: {
    marginTop: 50,
    flex: 3,
  },
  resultInfoContainer: {
    flex: 2,
  },
  resultInfoText: {
    fontSize: 24,
    textAlign: 'center',
    color: Variables.GREY360
  },
  resultActionsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  resultPoints: {
    color: Variables.GREEN360,
    fontSize: 140,
    textAlign: 'center',
    marginBottom: -20,
  },
  buttonLight: {
    backgroundColor: Variables.GREY90
  },
  resultMaxpoints: {
    margin: 0,
    fontSize: 26,
    color: Variables.GREY90,
    textAlign: 'center'
  }
});

module.exports = ResultView;
