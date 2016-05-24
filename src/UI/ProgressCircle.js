import React, { Component } from 'react'
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
    /**
     * Background fill color string to use for the stroke.
     */
    fillBackground: React.PropTypes.string.isRequired,
  },

  getDefaultProps(): Object {
    return {
      diameter: 100,
      fill: Variables.GREEN180,
      strokeWidth: 8,
    };
  },

  render: function() {
    var angle = this.computeAngle();

    var outerRadius = this.props.diameter / 2;
    var innerRadius = (this.props.diameter / 2) - this.props.strokeWidth;

    return (
        <Surface
            style={this.props.style}
            width={this.props.diameter}
            height={this.props.diameter}>

          <Wedge
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              startAngle={angle}
              endAngle={360}
              fill={this.props.fillBackground}>
          </Wedge>

          <Wedge
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              startAngle={0}
              endAngle={angle}
              fill={this.props.fill}>
            {this.props.children}
          </Wedge>

        </Surface>
    );
  },

  /**
   * Returns the angle of the wedge depending on the
   * completion percentage of the progress circle.
   *
   * @returns {number} Angle depending on completion percentage.
   */
  computeAngle: function () {
    var angle = (360 / 100) * this.props.complete;

    // To avoid issues with 0 degree angles,
    // set it to a low float instead.
    if (angle === 0) {
      return 0.000001;
    }

    return angle;
  },
});

module.exports = ProgressCircle;
