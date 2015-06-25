var {
  Button,
  Headline
} = require('../../GuessUI');
var React = require('react-native');
var {
  View,
  ListView,
  Text,
  Image,
  StyleSheet
} = React;

var HighscoreTabView = require('./HighscoreTabView');
var HighscoreListView = require('./HighscoreListView');

var HighscoreView = React.createClass({

  propTypes: {
    highscores: React.PropTypes.object.isRequired,
    onTabSwitch: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <View style={styles.container}>
        <HighscoreTabView onTabSwitch={this.props.onTabSwitch} >
          <HighscoreListView highscores={this.props.highscores} />
        </HighscoreTabView>
      </View>
    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
});

module.exports = HighscoreView;
