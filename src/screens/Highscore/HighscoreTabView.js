var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;
var {
  Icon
} = require('../../GuessUI');


var HighscoreTabView = React.createClass({

  propTypes: {
    onTabSwitch: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      selectedTab: 'resultsMonth',
    };
  },

  render: function () {
    const tabs = [
      {
        title: "Last month",
        icon: 'uni26',
        id: 'resultsMonth'
      },
      {
        title: "Last year",
        icon: 'uni27',
        id: 'resultsYear'
      },
      {
        title: "All time",
        icon: 'uni23',
        id: 'resultsAllover'
      }
    ];

    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff">
        {tabs.map((tab) =>
          <Icon.TabBarItem
              title={tab.title}
              iconName={tab.icon}
              selected={this.state.selectedTab === tab.id}
              onPress={() => {
                this.props.onTabSwitch(tab.id);
                this.setState({selectedTab: tab.id });
              }}>
            {this.props.children}
            </Icon.TabBarItem>
        )}
      </TabBarIOS>
    );
  }

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});


module.exports = HighscoreTabView;
