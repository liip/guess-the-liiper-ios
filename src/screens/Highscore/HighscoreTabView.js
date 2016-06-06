import React, {Component} from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'
import {Icon} from '../../GuessUI'
import * as Variables from '../../Variables'

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
      <TabBarIOS
        tintColor={Variables.GREEN180}>
        {tabs.map((tab) =>
          <Icon.TabBarItem
            title={tab.title}
            iconName={tab.icon}
            selected={this.state.selectedTab === tab.id}
            key={Math.random()}
            onPress={() => {
                this.props.onTabSwitch(tab.id)
                this.setState({selectedTab: tab.id })
              }}>
            {this.props.children}
          </Icon.TabBarItem>
        )}
      </TabBarIOS>
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
})

HighscoreTabView.propTypes = {
  onTabSwitch: React.PropTypes.func.isRequired
}

module.exports = HighscoreTabView
