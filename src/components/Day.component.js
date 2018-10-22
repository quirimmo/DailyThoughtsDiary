import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Button } from 'react-native';

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
					} items`}
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

export default Day;
