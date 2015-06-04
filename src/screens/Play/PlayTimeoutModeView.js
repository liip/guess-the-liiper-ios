'use strict';

var React = require('react-native');
var {
  Animation,
  Image,
  StyleSheet,
  View,
} = React;

var {
  Button,
  Grid,
  ProgressBarAnimation,
  ProgressCircle,
} = require('../../GuessUI');

// Timeout in ms.
var PLAYER_TIMEOUT = 10000;

var PlayTimeoutModeView = React.createClass({

  propTypes: {
    game: React.PropTypes.object.isRequired,
    gameResults: React.PropTypes.array.isRequired,
    onGuess: React.PropTypes.func.isRequired,
    onNext: React.PropTypes.func.isRequired,
    showResult: React.PropTypes.bool.isRequired,
  },

  componentDidMount: function() {
    this.refs['progress-bar'].restart();
    // Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {scaleXY: [1, 1]});
    // Animation.startAnimation(this.refs['this'], 100, 0, 'easeInOutQuad', {opacity: 1});
  },

  render: function() {
    var game = this.props.game;

    return (
      <View style={styles.container}>
        <View ref="this" style={styles.content}>

          <!-- Todo: component Progress Circle -->
          <ProgressCircle
            style={styles.circleProgress}
            fill="#e3e3e3"
            complete={100}
            diameter="218" />
          <ProgressBarAnimation
            ref="progress-bar"
            style={styles.circleProgress}
            type="circle"
            width="218"
            duration={PLAYER_TIMEOUT}
            onFinish={this.onTimeUp} />

          <!-- Todo: component Avatar  -->
          <Image style={styles.picture} source={{uri: game.picture }} />

          <!-- Todo: comonent PersonsGrid -->
          <Grid amountInRow={2}>
            {this.renderButtons(game.persons)}
          </Grid>

        </View>

        <View style={styles.footer}>
          {this.props.showResult &&
            <Button
              style={styles.buttonContinue}
              onPress={this.props.onNext}>
              Continue
            </Button>
          }
        </View>
      </View>
    );
  },

  renderButtons: function(persons) {
    return persons.map(person =>
        <Button
          style={this.getButtonStyle(person)}
          onPress={() => this.onButtonPressed(person.resultId) }>
          {person.name}
        </Button>
    );
  },

  getButtonStyle: function(person) {
    if (!this.props.showResult) {
      return styles.buttonDefault;
    }

    var result = this.props.gameResults[this.props.gameResults.length - 1];

    // Todo: result.isPerson(person)
    if (result.resultid == person.resultId) {
      return styles.buttonCorrect;
    }

    // Todo: result.wronglySelected(person)
    if (!result.correct && result.selectedResultid == person.resultId) {
      return styles.buttonWrong;
    }

    return styles.buttonDefault;
  },

  onButtonPressed: function(resultid) {
    if (this.props.showResult) { return; }

    this.props.onGuess(resultid, PLAYER_TIMEOUT);
  },

  onTimeUp: function() {
    if (this.props.showResult) { return; }

    this.props.onGuess(null, PLAYER_TIMEOUT);
  },

  pauseOrRestartProgressBar: function(showResult) {
    if (showResult) {
      this.refs['progress-bar'].pause();
    } else {
      this.refs['progress-bar'].restart();
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.pauseOrRestartProgressBar(newProps.showResult);
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    marginTop: 74,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
  },
  circleProgress: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 1,
    left: 58,
  },
  content: {
    flex: 10
  },
  footer: {
    flex: 1
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
    paddingTop: 50,
    alignSelf: 'center',
  },
  buttonDefault: {
    backgroundColor: 'rgba(200,200,200,0.8)}',
  },
  buttonCorrect: {
    backgroundColor: 'rgba(0,255,0,0.8)',
  },
  buttonWrong: {
    color: 'white',
    backgroundColor: 'rgba(255,0,0,0.8)',
  },
});

module.exports = PlayTimeoutModeView;
