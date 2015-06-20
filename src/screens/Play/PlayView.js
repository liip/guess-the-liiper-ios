'use strict';

var React = require('react-native');
var Variables = require('../../Variables');
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
  FaceGridBackground
} = require('../../GuessUI');

var PlayBackground = require('./PlayBackground');

// Timeout in ms.
var PLAYER_TIMEOUT = 10000;

var PlayView = React.createClass({

  propTypes: {
    game: React.PropTypes.object.isRequired,
    gameResults: React.PropTypes.array.isRequired,
    onGuess: React.PropTypes.func.isRequired,
    onNext: React.PropTypes.func.isRequired,
    showAnswer: React.PropTypes.bool.isRequired,
  },

  componentDidMount: function() {
    this.refs['progress-bar'].restart();
    // Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {scaleXY: [1, 1]});
    // Animation.startAnimation(this.refs['this'], 100, 0, 'easeInOutQuad', {opacity: 1});
  },

  render: function() {
    var game = this.props.game;

    return (
      <PlayBackground>
        <View ref="this" style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.picture} source={{uri: game.picture }} />

            <ProgressCircle
              style={styles.circleProgress}
              fill="#e3e3e3"
              complete={100}
              diameter="212" />
            <ProgressBarAnimation
              ref="progress-bar"
              style={styles.circleProgress}
              type="circle"
              width="212"
              duration={PLAYER_TIMEOUT}
              onFinish={this.onTimeUp} />
          </View>

          <Grid amountInRow={2}>
            {this.renderButtons(game.persons)}
          </Grid>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerButtonContainer}>
            {this.props.showAnswer &&
              <Button
                style={styles.buttonContinue}
                onPress={this.props.onNext}>
                Continue
              </Button>
            }
          </View>
        </View>
      </PlayBackground>
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
    if (!this.props.showAnswer) {
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
    if (this.props.showAnswer) { return; }

    this.props.onGuess(resultid, PLAYER_TIMEOUT);
  },

  onTimeUp: function() {
    if (this.props.showAnswer) { return; }

    this.props.onGuess(null, PLAYER_TIMEOUT);
  },

  pauseOrRestartProgressBar: function(showAnswer) {
    if (showAnswer) {
      this.refs['progress-bar'].pause();
    } else {
      this.refs['progress-bar'].restart();
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.pauseOrRestartProgressBar(newProps.showAnswer);
  }

});


var styles = StyleSheet.create({
  circleProgress: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 3,
    left: 58,
  },
  imageContainer: {
    height: 220
  },
  content: {
    flex: 2
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  footerButtonContainer: {
    flex: 1
  },
  picture: {
    position: 'absolute',
    width: 200,
    height: 200,
    margin: 10,
    paddingTop: 50,
    alignSelf: 'center',
    left: 55,
  },
  buttonDefault: {
    backgroundColor: Variables.GREYRGBA80,
    borderColor: Variables.GREYRGBA80,
    borderWidth: 2,
  },
  buttonCorrect: {
    borderColor: Variables.GREEN360,
    borderWidth: 2,
  },
  buttonWrong: {
    color: 'white',
    backgroundColor: Variables.REDRGBA80,
    borderColor: Variables.REDRGBA80,
    borderWidth: 2,
  }
});

module.exports = PlayView;
