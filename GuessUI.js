'use strict';

var React = require('react-native');
var {
  Animation,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');

var Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
        underlayColor="#eeeeee">
        <Text>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    );
  },
});

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

  render: function() {
    var rows = this.group(this.props.children, this.props.amountInRow)
      .map((row) =>
          <View style={styles.row}>
            {row}
          </View>
      );

    return (
      <View style={styles.grid}>
        {rows}
      </View>
    );
  },

  group: function(children, amountInRow) {
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

var ProgressBar = React.createClass({
  propTypes: {
    /**
     * Percentage value from 0 to 100.
     */
    complete: React.PropTypes.number.isRequired,
  },

  render: function() {
    var width = {width: this.props.complete};
    return (
      <View style={styles.progressBar}>
        <View style={[styles.progressBar, styles.progressBarCompleted, width]} />
      </View>
    );
  },

});

var ProgressBarAnimation = React.createClass({
  mixins: [TimerMixin],

  propTypes: {
    /**
     * Time in milliseconds the progress bar runs.
     */
    duration: React.PropTypes.number.isRequired,
    /**
     * Callback to call when finished.
     */
    onFinish: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      complete: 100
    }
  },

  runAnimation: function() {
    this.timer = () => this.requestAnimationFrame(this.runAnimation);

    if (!this.startTime) {
      this.startTime = Date.now();
    }

    // Reset when finished.
    var duration = Date.now() - this.startTime;
    if (duration >= this.props.duration) {
      this.startTime = null;
      this.timer = null;
      this.props.onFinish();
    }

    this.calculateComplete(duration);

    this.timer && this.timer();
  },

  calculateComplete: function(duration) {
    var complete = 100 - Math.ceil((duration / this.props.duration) * 100);
    if (complete !== this.state.complete) {
      this.setState({complete: complete});
    }
  },

  componentDidMount: function() {
    this.runAnimation();
  },

  render: function() {
    return (
      // Todo: Move ProgressBar one layer up so this class is reusable.
      <ProgressBar complete={this.state.complete} />
    );
  },
});

// Styles
var styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'silver',
    borderColor: 'rgba(150,150,150,0.8)',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    margin: 5,
    padding: 10,
  },
  grid: {
  },
  row: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  progressBar: {
    width: 100,
    height: 20,
    margin: 15,
    backgroundColor: 'silver',
    alignSelf: 'center',
  },
  progressBarCompleted: {
    margin: 0,
    backgroundColor: 'green',
    alignSelf: 'auto',
    width: 60,
  }
});

module.exports = {
  Button: Button,
  Grid: Grid,
  ProgressBarAnimation: ProgressBarAnimation,
};
