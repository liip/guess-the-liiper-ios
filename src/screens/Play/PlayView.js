/* @flow */
'use strict'

import React, {Component} from 'react'
import Variables from '../../Variables'
import {
  Image,
  StyleSheet,
  View,
  LayoutAnimation,
  Dimensions
} from 'react-native'
import {
  Button,
  Grid,
  ProgressAnimation,
  ProgressCircle,
  FaceGridBackground
} from '../../GuessUI'
import Avatar from './UI/Avatar'
import PlayBackground from './PlayBackground'
import type {Game, Person} from '../../GuessDomain'

// Timeout in ms.
const PLAYER_TIMEOUT = 10000

var PlayView = React.createClass({

  propTypes: {
    game: React.PropTypes.object.isRequired,
    gameResults: React.PropTypes.array.isRequired,
    onGuess: React.PropTypes.func.isRequired,
    onNext: React.PropTypes.func.isRequired,
    showAnswer: React.PropTypes.bool.isRequired,
  },

  animation: {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.6,
    },
  },

  startProgress: function () {
    this.refs['progress-bar'].restart()
  },

  render: function () {
    LayoutAnimation.configureNext(this.animation)
    var game:Game = this.props.game
    // Depending on the screen height.
    var avatarDiameter = Math.round(Dimensions.get('window').height / 3)

    return (
      <PlayBackground>

        <View style={styles.avatarContainer}>
          <Avatar picture={game.picture} diameter={avatarDiameter} onLoad={this.startProgress}>
            <ProgressAnimation ref="progress-bar" duration={PLAYER_TIMEOUT} onFinish={this.onTimeUp}>
              {(complete) => (
                <ProgressCircle
                  fill={Variables.GREEN270}
                  fillBackground={Variables.GREY0}
                  complete={complete}
                  diameter={avatarDiameter}/>
              )}
            </ProgressAnimation>
          </Avatar>
        </View>

        <View style={styles.buttonsContainer}>
          <Grid amountInRow={1}>
            {this.renderButtons(game.persons)}
          </Grid>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.continueContainer}>
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
    )
  },

  renderButtons: function (persons:Array<Person>):Array<ReactElement> {
    return persons.map(person =>
      <Button
        key={Math.random()}
        style={this.getButtonStyle(person)}
        onPress={() => this.onButtonPressed(person.resultId) }>
        {person.name}
      </Button>
    )
  },

  getButtonStyle: function (person:Person) {
    if (!this.props.showAnswer) {
      return styles.buttonDefault
    }

    var result = this.props.gameResults[this.props.gameResults.length - 1]

    // Todo: result.isPerson(person)
    if (result.resultid == person.resultId) {
      return styles.buttonCorrect
    }

    // Todo: result.wronglySelected(person)
    if (!result.correct && result.selectedResultid == person.resultId) {
      return styles.buttonWrong
    }

    return styles.buttonDefault
  },

  onButtonPressed: function (resultid:string) {
    if (this.props.showAnswer) {
      return
    }

    var timeInMs = this.refs['progress-bar'].getTimeInMs()
    this.props.onGuess(resultid, timeInMs)
  },

  onTimeUp: function () {
    console.log('time is up', this.props.showAnswer)
    if (this.props.showAnswer) {
      return
    }

    this.props.onGuess(null, PLAYER_TIMEOUT)
  },

  pauseOrRestartProgressBar: function (showAnswer:bool) {
    if (showAnswer) {
      this.refs['progress-bar'].pause()
    } else {
      this.refs['progress-bar'].reset()
    }
  },

  componentWillReceiveProps: function (newProps:Object) {
    this.pauseOrRestartProgressBar(newProps.showAnswer)
  }
})


var styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center'
  },
  buttonsContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  continueContainer: {
    flex: 1
  },
  progressCircle: {
    position: 'absolute',
  },
  buttonDefault: {
    backgroundColor: Variables.GREYRGBA80,
  },
  buttonCorrect: {},
  buttonWrong: {
    backgroundColor: Variables.REDRGBA80,
  }
})

module.exports = PlayView
