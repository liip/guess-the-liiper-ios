var React = require('react-native');
var {
    View,
    Image,
} = React;

/**
 * An avatar shows a picture of a person with rounded corners.
 */
var Avatar = React.createClass({

    propTypes: {
        picture: React.PropTypes.string.isRequired,
        diameter: React.PropTypes.number.isRequired,
        onLoad: React.PropTypes.func.isRequired,
    },

    render: function() {
        var avatarStyles = {
            width: this.props.diameter - 1,
            height: this.props.diameter - 1,
        };

        return (
            <View style={{width:this.props.diameter, height: this.props.diameter }}>
                <Image
                    source={{uri: this.props.picture }}
                    style={avatarStyles}
                    onLoad={this.props.onLoad}>
                    {this.props.children}
                </Image>
            </View>
        );
    }
});

module.exports = Avatar;
