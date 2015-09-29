var React = require('react-native');
var Variables = require('../Variables');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions
} = React;

var Button = React.createClass({

  /**
   * Depending on the screen size, the pixel size should be different.
   *
   * @returns {number}
   */
  getPaddingForScreen: function() {
    var screen = Dimensions.get('window');

    // iphone 4
    if (screen.height <= 480) {
      return 5;
    }

    // iphone 5
    if (screen.height <= 568) {
      return 7;
    }

    return 10;
  },

  render: function() {
    var screenSize = {
      padding: this.getPaddingForScreen(),
    };

    return (
        <TouchableHighlight
            onPress={this.props.onPress}
            style={[styles.button, screenSize, this.props.style]}
            underlayColor="#eeeeee">
          <Text style={[styles.buttonText, this.props.textStyle]}>
            {this.props.children}
          </Text>
        </TouchableHighlight>
    );
  },
});


// Styles
var styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Variables.GREEN180,
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
    margin: 5,
  },
  buttonText: {
    fontFamily: 'Liip Etica',
    fontWeight: '500',
    color: 'white',
    fontSize: 16
  }
});

module.exports = Button;
