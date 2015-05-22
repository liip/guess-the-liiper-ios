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
    return (
      <View style={styles.grid}>
        {this.group(this.props.children, this.props.amountInRow).map((row) =>
          <View style={styles.row}>
            {row}
          </View>
        )}
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
    return (
      <View style={styles.progressBar}>
        <View style={[
          styles.progressBar,
          styles.progressBarCompleted,
          {width: this.props.complete}
        ]} />
      </View>
    );
  },
});


var CIRCLE_PATH = "m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z";
var ReactART = require('ReactNativeART');
var {
   Surface,
   Path,
   Group,
   // Transform,
   Shape,
} = ReactART;


var ProgressCircle = React.createClass({
  propTypes: {
    /**
     * Completion in percent from 0-100.
     */
    complete: React.PropTypes.number.isRequired,
    /**
     * Diamater (= width and height) of the circle.
     */
    diameter: React.PropTypes.number.isRequired,
    /**
     * Width of the progress stroke.
     */
    strokeWidth: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      diameter: 100,
      strokeWidth: 8,
    };
  },

  render() {
    var baseWidth = 72;
    var strokeLength = 102 + (this.props.complete / 100  * 100);
    var scale = this.props.diameter / baseWidth;

    return (
      <Surface
        style={styles.circleProgress}
        width={this.props.diameter}
        height={this.props.diameter}>
          <Shape
            strokeWidth={this.props.strokeWidth / scale}
            stroke={GREEN180}
            strokeDash={[strokeLength]}
            scale={scale}
            d={CIRCLE_PATH} />
      </Surface>
    );

    // Make stroke ends square instead of round.
    //strokeCap="square"
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
    /**
     *
     */
    decreasing: React.PropTypes.bool,

    width: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      complete: this.props.bool ? 100 : 0
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
    var complete = (duration / this.props.duration) * 100;

    if (this.props.decreasing) {
      complete = 100 - complete;
    }

    if (complete !== this.state.complete) {
      this.setState({complete: complete});
    }
  },

  componentDidMount: function() {
    this.runAnimation();
  },

  render: function() {
    if (this.props.type === 'circle') {
      return <ProgressCircle
                diameter={this.props.width}
                complete={this.state.complete} />
    }

    return (
      // Todo: Move ProgressBar one layer up so this class is reusable.
      <ProgressBar complete={this.state.complete} />
    );
  },
});

var ScrollView = React.createClass({
  render: function() {
    return (
      <React.ScrollView contentContainerStyle={this.props.style}>
        {this.props.children}
      </React.ScrollView>
    );
  },
});


// Colors
var GREEN0 = '#d0dd2c';
var GREEN90 = '#bacf34';
var GREEN180 = '#a4c339';
var GREEN270 = '#8bb43f';
var GREEN360 = '#6ea644';
var ORANGE0 = '#fdb913';
var ORANGE180 = '#f68b28';
var ORANGE360 = '#f26531';
var GREY0 = '#dcdcdc';
var GREY180 = '#8c8c8c';
var GREY360 = '#414141';
var RED = '#d54361';

// Styles
var styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: GREEN180,
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
    margin: 5,
    padding: 15,
  },
  circleProgress: {
    marginTop: 64,
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
  ProgressCircle: ProgressCircle,
  ScrollView: ScrollView,
};
