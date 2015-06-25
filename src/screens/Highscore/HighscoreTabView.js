var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

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
        id: 'resultsMonth'
      },
      {
        title: "Last year",
        id: 'resultsYear'
      },
      {
        title: "All time",
        id: 'resultsAllover'
      }
    ];

    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff">
        {tabs.map((tab) =>
          <TabBarIOS.Item
              title={tab.title}
              selected={this.state.selectedTab === tab.id}
              onPress={() => {
                this.setState({
                  selectedTab: tab.id,
                });
              }}>
            {this.props.children}
            </TabBarIOS.Item>
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
