import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native';

/**
 * Groups children in a grid.
 *
 * Example:
 *   <Grid amountInRow="2">
 *     <Button ..>
 *     ...
 *   </Grid>
 */
var Grid = React.createClass({
  propTypes: {
    /**
     * How many children should show up in a row.
     */
    amountInRow: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
        <View style={styles.grid}>
          {this.group(this.props.children, this.props.amountInRow).map((row) =>
            <View style={styles.row} key={Math.random()}>
              {row}
            </View>
          )}
        </View>
    );
  },

  group: function (children:Array<Object>, amountInRow:number) {
    var rows = [];

    children.forEach((child, index) => {
      if ((index % amountInRow) === 0) {
        rows.push([]);
      }

      rows[rows.length - 1].push(child);
    });

    return rows;
  },
});


// Styles
var styles = StyleSheet.create({
  grid: {
    flex: 1,
  },
  row: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
});

module.exports = Grid;
