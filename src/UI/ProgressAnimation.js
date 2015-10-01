var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

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
         * If true, the animation goes backwards.
         */
        decreasing: React.PropTypes.bool,
    },

    getInitialState: function() {
        return {
            complete: this.props.bool ? 100 : 0
        }
    },

    runAnimation: function() {
        if (this.state.paused || !this.isMounted()) {
            return;
        }

        this.timer = () => this.requestAnimationFrame(this.runAnimation);

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        // Reset when finished.
        var duration = Date.now() - this.startTime;
        if (duration >= this.props.duration) {
            this.reset();
            this.props.onFinish();
        }

        this.calculateComplete(duration);

        this.timer && this.timer();
    },

    calculateComplete: function(duration :number) {
        var complete = (duration / this.props.duration) * 100;

        if (this.props.decreasing) {
            complete = 100 - complete;
        }

        if (complete !== this.state.complete) {
            this.setState({complete: complete});
        }
    },

    reset: function() {
        this.startTime = null;
        this.timer = null;
    },

    restart: function() {
        this.reset();
        this.setState({paused: false}, this.runAnimation);
    },

    pause: function() {
        this.setState({paused: true});
    },

    getTimeInMs: function() {
        return Date.now() - this.startTime;
    },

    componentDidMount: function() {
        this.runAnimation();
    },

    render: function() {
        if (!this.props.children) {
            return null;
        }

        return this.props.children(this.state.complete);
    },
});


module.exports = ProgressBarAnimation;
