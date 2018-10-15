import * as React from 'react';
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
		return <Day day={item} onPressed={this.props.onDayPressed.bind(this, item)} />;
	}

	renderSeparator = () => <Divider style={globalStyles.standardDivider} />;
}

export default DaysList;
