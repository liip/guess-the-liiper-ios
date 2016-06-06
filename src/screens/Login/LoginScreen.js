/**
 * @flow
 */

var GuessApi = require('../../GuessApi')
var {Button} = require('../../GuessUI')
var LoginView = require('./LoginView')
var TimerMixin = require('react-timer-mixin')
var HighscoreScreen = require('../Highscore/HighscoreScreen')
import React, { Component } from 'react'
import {View} from 'react-native'
var WebLoginView = require('./WebLoginView')

var LoginScreen = React.createClass({
  mixins: [TimerMixin],

  statics: {
    title: 'Guess the Liiper'
  },

  componentDidMount: function() {
    this.tryAuth()
  },

  getInitialState: function() {
    return {
      loggedIn: false,
      showWebView: false,
      loading: true,
      authUrl: null,
    }
  },

  render: function() {
    var webView
    if (this.state.authUrl) {
      webView = (
        <WebLoginView
          url={this.state.authUrl}
          onUrlChange={this.onWebLoginUrlChange} />
      )

      if (this.state.showWebView) {
        return webView
      }
    }

    return (
      <LoginView
        loggedIn={this.state.loggedIn}
        loading={this.state.loading}
        onLoginPressed={this.onLoginPressed}
        onHighscorePressed={this.onHighscorePressed}
        onLogoutPressed={this.onLogoutPressed}
        onPlayPressed={this.onPlayPressed}>
        {webView}
      </LoginView>
    )
  },

  onLoginPressed: function() {
    return GuessApi.authUrl()
      .then((authUrl) => {
        this.setState({
          authUrl: authUrl,
          loading: true
        })
      })
      .catch(console.error)
  },

  onHighscorePressed: function() {
    this.props.navigator.push({
      title: HighscoreScreen.title,
      component: HighscoreScreen,
      backButtonTitle: 'Back',
    })
  },

  onLogoutPressed: function() {
    return GuessApi.logout()
      .then(() => this.setState({authUrl: null, loggedIn: false}))
  },

  onPlayPressed: function () {
    var PlayScreen = require('../Play/PlayScreen')
    this.props.navigator.push({
      title: PlayScreen.title,
      component: PlayScreen,
      backButtonTitle: 'Back',
    })
  },

  /**
   * This function probably fails on Android Device
   * @param state
   */
  onWebLoginUrlChange: function(state: Object) {
    // Show the webview in case we don't get an answer within x sec.
    this.whenInactiveShowWebview()

    if (this.isUserActionRequired(state)) {
      this.clearTimeout(this.timeout)
      return this.setState({showWebView: true})
    }

    if (GuessApi.isStartPage(state.url)) {
      this.clearTimeout(this.timeout)
      this.setState({authUrl: null, showWebView: false})
      this.tryAuth()
    }
  },

  isUserActionRequired: function(state) {
    return GuessApi.isRequestForPermission(state.title)
        || GuessApi.isSignIn(state.title)
  },

  whenInactiveShowWebview: function() {
    if (this.timeout) {
      this.clearTimeout(this.timeout)
    }

    this.timeout = this.setTimeout(() => {
      this.setState({showWebView: true})
    }, 3000)
  },

  tryAuth: function() {
    return GuessApi.testAuth()
      .then(loggedIn => this.setState({
        loggedIn: loggedIn,
        loading: false
      }))
  },

})

console.log('Login Screeen')

module.exports = LoginScreen
