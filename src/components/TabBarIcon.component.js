import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import Colors from '../styles/colors.styles';

class TabBarIcon extends React.Component {
	render() {
		return (
			<Icon.Ionicons
				name={this.props.name}
				size={26}
				color={
					this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
				}
			/>
		);
	}
}

TabBarIcon.propTypes = {
	focused: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired
};

export default TabBarIcon;
