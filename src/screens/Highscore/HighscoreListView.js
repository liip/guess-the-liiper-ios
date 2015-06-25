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

var HighscoreListView = React.createClass({

  propTypes: {
    highscores: React.PropTypes.object.isRequired,
  },

  render: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(this.props.highscores);

    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  },

  renderRow: function(rowData, sectionID, rowID) {
    var imgSource = {
      uri: 'http://guess.liip.ch/picture/' + rowData.id + '/200/false/image.png'
    };

    return (
      <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={imgSource} />
          <Text style={styles.textName}>
            {rowData.firstName + '  ' + rowData.lastName }
          </Text>
          <Text style={styles.textName}>
            {'Games: ' + rowData.games } {'\n'}
            {'Max: ' + rowData.maxPoints } {'\n'}
            {'Ø ' + rowData.avgPoints }
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

});


var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  textName: {
    flex: 1,
    marginLeft: 10
  },
});

module.exports = HighscoreListView;
