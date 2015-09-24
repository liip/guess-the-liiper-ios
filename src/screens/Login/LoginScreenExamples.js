var React = require('react-native');
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
module.exports = {
  LoggedIn: LoggedIn,
  LoginLoading: LoginLoading,
  LoggedOut: LoggedOut,
};


