/* @flow */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import { FaceGridBackground, } from '../GuessUI'

var LaunchView = React.createClass({

  statics: {
    title: ' ',
  },

  render: function() {
    return (
      <FaceGridBackground>
        <View style={styles.container}>
         <View style={styles.loginContainer}>
              <Image style={styles.logo} source={{ uri: 'GuessLogo', isStatic: true }}/>
          </View>
        </View>
      </FaceGridBackground>
    )
  }
})

var styles = StyleSheet.create({

})

module.exports = LaunchView
