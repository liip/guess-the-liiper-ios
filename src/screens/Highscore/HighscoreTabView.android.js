import React, {Component} from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'
import {Icon} from '../../GuessUI'
import * as Variables from '../../Variables'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'

class HighscoreTabView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'resultsMonth',
    }
  }

  render() {
    const tabs = Variables.highScore.tabs

    return (
      <View style={styles.tabContainer}>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() =>
            <ScrollableTabBar />}
        >
          <Text tabLabel='Tab #1'>My</Text>
          <Text tabLabel='Tab #2 word word'>Favorite</Text>
          <Text tabLabel='Tab #3 word word word'>project</Text>
          <Text tabLabel='Tab #4 word word word word'>favorite</Text>
          <Text tabLabel='Tab #5'>project</Text>
        </ScrollableTabView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  tabContainer: {
    flex: 1,
    marginTop: 30,
  },
})

HighscoreTabView.propTypes = {
  onTabSwitch: React.PropTypes.func.isRequired
}

module.exports = HighscoreTabView
