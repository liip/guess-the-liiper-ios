import React, { Component } from 'react'
var LoginView = require('./LoginView');

var defaults = {
  onLoginPressed: () => {},
  onLogoutPressed: () => {},
  onPlayPressed: () => {},
};

var LoggedIn = React.createClass({
  render: () => {
    return <LoginView {...defaults} loggedIn={true} />;
  }
});

var LoggedOut = React.createClass({
  render: () => {
    return <LoginView {...defaults} loggedIn={false} />;
  }
});

var LoginLoading = React.createClass({
  render: () => {
    return <LoginView {...defaults} loading={true} />;
  }
});

console.log('LoginScreenExamples');

module.exports = {
  LoggedIn: LoggedIn,
  LoginLoading: LoginLoading,
  LoggedOut: LoggedOut,
};
