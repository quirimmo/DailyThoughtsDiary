import * as React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import Item from './Item.component';
import globalStyles from '../styles/global.styles';

class ItemsList extends React.Component {
	constructor(props) {
		super(props);

		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	render() {
		return (
			<ScrollView style={globalStyles.screenContainer}>
				<FlatList
					style={{ flex: 1 }}
					data={this.props.items}
					renderItem={({ item }) => this.getItem(item)}
					contentContainerStyle={globalStyles.flatListItemContentContainer}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</ScrollView>
		);
	}

	getItem(item) {
		return (
			<Item
				onUpdateItem={this.updateItem}
				onDeleteItem={this.deleteItem}
				item={item}
			/>
		);
	}

	deleteItem(item) {
		this.props.onDeleteItem(item);
	}

	updateItem(item) {
		this.props.onUpdateItem(item);
	}

	renderSeparator = () => <Divider style={globalStyles.standardDivider} />;
}

ItemsList.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			symptoms: PropTypes.string,
			location: PropTypes.string,
			thoughts: PropTypes.string,
			date: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		})
	).isRequired,
	onDeleteItem: PropTypes.func.isRequired,
	onUpdateItem: PropTypes.func.isRequired
};

export default ItemsList;
