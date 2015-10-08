var React = require('react-native');
var CircleProgressView = require('react-native-circle-view');
var Variables = require('../Variables');
var {StyleSheet} = React;

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

    getDefaultProps() :Object {
        return {
            diameter: 100,
            fill: Variables.GREEN180,
            strokeWidth: 8,
        };
    },

    render() {
        var dimensions = {
            width: this.props.diameter,
            height: this.props.diameter,
        };

        return (
            <CircleProgressView
                style={dimensions}
                сontourColor="#f4f4f4"
                rimColor="#f4f4f4"
                barColor={[this.props.fill]}
                value={this.props.complete}
                maxValue={100}
                сontourSize={280}
                rimWidth={20}
                barWidth={20}
            >
                {this.props.children}
                </CircleProgressView>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

module.exports = ProgressCircle;
