var {
  Button,
  Headline
} = require('../../GuessUI');
import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  Image,
  StyleSheet
} from 'react-native';

var HighscoreListView = React.createClass({

  propTypes: {
    highscore: React.PropTypes.object.isRequired,
    selected_tab: React.PropTypes.string.isRequired,
  },

  render: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(this.props.highscore[this.props.selected_tab] || []);

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
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{parseInt(rowID) + 1}</Text>
          </View>
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
  placeContainer: {
    width: 40,
  },
  place: {
    color: 'grey',
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
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
