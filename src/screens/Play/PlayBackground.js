import React, {Component} from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {FaceGridBackground} from '../../GuessUI'

class PlayBackground extends Component {
  render() {
    return (
      <FaceGridBackground>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </FaceGridBackground>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    marginTop: 74,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
  }
})

module.exports = PlayBackground
