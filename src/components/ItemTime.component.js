import * as React from 'react';
import moment from 'moment';
import { Text, View, Button, TimePickerAndroid } from 'react-native';
import GlobalStyles from '../styles/global.styles';
import ItemTimeStyles from '../styles/item-time.styles';

class ItemTime extends React.Component {
	constructor(props) {
		super(props);
		this.onSettingTime = this.onSettingTime.bind(this);
	}

	render() {
		return (
			<React.Fragment>
				<Text style={GlobalStyles.label}>Time:</Text>
				<View style={GlobalStyles.rowContainer}>
					<View style={ItemTimeStyles.currentTimeContainer}>
						<Text style={ItemTimeStyles.currentTimeText}>
							{moment(this.props.date).format('HH:mm')}
						</Text>
					</View>
					<View style={ItemTimeStyles.changeTimeButtonContainer}>
						<Button title="Change Time" onPress={this.onSettingTime} />
					</View>
				</View>
			</React.Fragment>
		);
	}

	async onSettingTime() {
		try {
			const { action, hour, minute } = await TimePickerAndroid.open({
				hour: moment(this.props.date).hours(),
				minute: moment(this.props.date).minutes()
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				this.props.onSetTime(hour, minute);
			}
		} catch ({ code, message }) {
			console.error('Cannot open time picker', message);
		}
	}
}

export default ItemTime;
