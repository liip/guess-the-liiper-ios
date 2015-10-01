var React = require('react-native');
var Wedge = require('./Wedge');
var ReactART = require('ReactNativeART');
var Variables = require('../Variables');
var { Surface } = ReactART;

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
        var angle = (360 / 100) * this.props.complete;

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
                    fill={this.props.fill}>
                    {this.props.children}
                </Wedge>
            </Surface>
        );
    },
});

module.exports = ProgressCircle;
