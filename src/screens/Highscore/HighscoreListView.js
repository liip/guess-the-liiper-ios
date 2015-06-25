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
          <Text style={styles.place}>{parseInt(rowID) + 1}</Text>
          <Image style={styles.thumb} source={imgSource} />
          <Text style={styles.personName}>
            {rowData.firstName + '  ' + rowData.lastName + '\n'}

            <Text style={styles.points}>
              {'Games: ' + rowData.games }
              {' Max: ' + rowData.maxPoints }
              {' Ø ' + rowData.avgPoints }
            </Text>
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

});


var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  place: {
    color: 'grey',
    paddingTop: 20,
    paddingRight: 10,
    fontSize: 20,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 10,
  },
  personName: {
    paddingTop: 10,
    fontSize: 16,
  },
  points: {
    fontSize: 13,
    color: 'grey',
  },
});

module.exports = HighscoreListView;
