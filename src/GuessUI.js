'use strict';

var React = require('react-native');
var Variables = require('./Variables');
var {
  Animation,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');
var Wedge = require('./UI/Wedge');
var ReactART = require('ReactNativeART');
var { Surface } = ReactART;
var Icon = require('./UI/LiipIconFont');


var Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
        underlayColor="#eeeeee">
        <Text style={[styles.buttonText, this.props.textStyle]}>
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
    /**
     * Fill color string to use for the stroke.
     */
    fill: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      diameter: 100,
      fill: Variables.GREEN180,
      strokeWidth: 8,
    };
  },

  render() {
    var angle = (360 / 100) * this.props.complete;

    console.log(this.props.children);
    if (angle === 0) {
      return null;
    }

    return (
      <Surface
        style={this.props.style}
        width={this.props.diameter}
        height={this.props.diameter}>
        <Wedge
           outerRadius={this.props.diameter / 2}
           innerRadius={(this.props.diameter / 2) - this.props.strokeWidth}
           startAngle={0}
           endAngle={angle}
           fill={this.props.fill}
        >
          {this.props.children}
        </Wedge>
      </Surface>
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
    if (this.state.paused) {
      return;
    }

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

  restart: function() {
    this.startTime = null;
    this.timer = null;
    this.setState({paused: false}, this.runAnimation);
  },

  pause: function() {
    this.setState({paused: true});
  },

  componentDidMount: function() {
    this.runAnimation();
  },

  render: function() {
    if (this.props.type === 'circle') {
      return (
        <ProgressCircle
          fill={Variables.GREEN180}
          style={this.props.style}
          diameter={this.props.width}
          complete={this.state.complete}>
          {this.props.children}
        </ProgressCircle>
      )
    }

    return (
      <ProgressBar complete={this.state.complete}>
        {this.props.children}
      </ProgressBar>
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

var FaceGridBackground =  React.createClass({
  render() {
    return (
      <Image
        style={styles.faceGridBackground}
        source={{ uri: 'bg', isStatic: true }}>
        {this.props.children}
      </Image>
    );
  }
});

// Styles
var styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: Variables.GREEN180,
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
    margin: 5,
    padding: 15,
  },
  buttonText: {
    fontFamily: 'Liip Etica',
    fontWeight: '500',
    color: 'white',
    fontSize: 16
  },
  grid: {
  },
  faceGridBackground: {
    flex: 1,
    resizeMode: Image.resizeMode.cover,
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
  FaceGridBackground: FaceGridBackground,
  ProgressBarAnimation: ProgressBarAnimation,
  ProgressCircle: ProgressCircle,
  ScrollView: ScrollView,
  Icon: Icon,
};
