import React, { Component } from 'react'
var {
  ProgressBarAnimation,
} = require('./GuessUI');


var CircularProgressAnimationExample = React.createClass({
  render() {
    return (
      <ProgressBarAnimation
        style={{flex: 1, justifySelf: 'center', alignSelf: 'center'}}
        type="circle"
        onFinish={() => {return;}}
        duration={1000 * 10}
        width={300}
        decreasing={true}
      />
    );
  },
});

module.exports = {
  CircularProgressAnimationExample: CircularProgressAnimationExample
};
