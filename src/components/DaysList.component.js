import * as React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import Day from './Day.component';
import globalStyles from '../styles/global.styles';

class DaysList extends React.Component {
	constructor(props) {
		super(props);

		this.getItem = this.getItem.bind(this);
	}

	render() {
		return (
			<ScrollView style={globalStyles.screenContainer}>
				<FlatList
					style={{ flex: 1 }}
					data={this.props.days}
					renderItem={({ item }) => this.getItem(item)}
					contentContainerStyle={globalStyles.flatListItemContentContainer}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</ScrollView>
		);
	}

	getItem(item) {
		return (
			<Day day={item} onPressed={this.props.onDayPressed.bind(this, item)} />
		);
	}

	renderSeparator = () => <Divider style={globalStyles.standardDivider} />;
}

DaysList.propTypes = {
	days: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				value: PropTypes.string.isRequired,
				count: PropTypes.number.isRequired
			})
		).isRequired,
		PropTypes.object
	]),
	onDayPressed: PropTypes.func.isRequired
};

export default DaysList;
