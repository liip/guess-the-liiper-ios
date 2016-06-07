import React, {Component} from 'react'
import {
  ActivityIndicatorIOS,
  View,
  ListView,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import {FaceGridBackground} from '../../GuessUI'
import HighscoreTabView from './HighscoreTabView'
import HighscoreListView from './HighscoreListView'

class HighscoreView extends Component {

  static get propTypes() {
    return {
      highscore: React.PropTypes.object,
      onTabSwitch: React.PropTypes.func.isRequired
    }
  }

  constructor(props) {
    super(props)
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS />
      </View>
    )
  }

  render() {
    var component
    if (this.props.loaded) {
      console.log('rendering with highscore')
      component = (
        <HighscoreTabView onTabSwitch={this.props.onTabSwitch}>
          <HighscoreListView selected_tab={this.props.selected_tab} highscore={this.props.highscore}/>
        </HighscoreTabView>
      )
    } else {
      console.log('rendering')
      component = this.renderLoading()
    }

    return (
      <FaceGridBackground>
        <View style={styles.container}>
          {component}
        </View>
      </FaceGridBackground>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }
})

module.exports = HighscoreView
