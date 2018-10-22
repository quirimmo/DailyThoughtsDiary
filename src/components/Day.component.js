import * as React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import moment from 'moment';
import { View, Button } from 'react-native';

const strings = getComponentStrings();

class Day extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Button
					title={`${moment(this.props.day.value).format('dddd DD-MM-YYYY')}: ${
						this.props.day.count
					} ${strings.items}`}
					onPress={this.props.onPressed}
				/>
			</View>
		);
	}
}

Day.propTypes = {
	day: PropTypes.shape({
		value: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired
	}).isRequired,
	onPressed: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			items: 'items'
		},
		it: {
			items: 'elementi'
		}
	});
}

export default Day;
