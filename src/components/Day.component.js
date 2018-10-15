import * as React from 'react';
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

export default Day;
