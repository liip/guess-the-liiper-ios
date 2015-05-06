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

module.exports = {
  LoggedIn: LoggedIn,
  LoggedOut: LoggedOut,
};


