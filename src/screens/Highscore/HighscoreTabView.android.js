import React, {Component} from 'react'
import {
  ScrollView,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native'
import {Icon} from '../../GuessUI'
import * as Variables from '../../Variables'
import ScrollableTabView, {
  DefaultTabBar,
  FacebookTabBar,
  ScrollableTabBar
} from 'react-native-scrollable-tab-view'

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
          renderTabBar={() => <ScrollableTabBar />}>
          {tabs.map((tab) =>
            <ScrollView
              tabLabel={tab.title}
              style={styles.tabView}
              key={Math.random()}
              onPress={() => {
                // TODO onPress do not work
                this.props.onTabSwitch(tab.id)
                this.setState({selectedTab: tab.id })
              }}>
              {this.props.children}
            </ScrollView>
          )}
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
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
})

HighscoreTabView.propTypes = {
  onTabSwitch: React.PropTypes.func.isRequired
}

module.exports = HighscoreTabView
