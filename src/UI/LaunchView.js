/* @flow */
var React = require('react-native');
var Variables = require('../Variables');
var { StyleSheet, StatusBarIOS, View, Text, Image} = React;
var { FaceGridBackground, ScrollView, Button, Link } = require('../GuessUI');

var LaunchView = React.createClass({
  render: function() {
    return (
      <FaceGridBackground>
        <View style={styles.container}>
         <View style={styles.loginContainer}>
              <Image style={styles.logo} source={{ uri: 'GuessLogo', isStatic: true }}/>
          </View>
        </View>
      </FaceGridBackground>
    );
  }
});

var styles = StyleSheet.create({

});
module.exports = LaunchView;
