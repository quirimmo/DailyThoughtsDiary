import * as React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import moment from 'moment';
import { Text, View, Button } from 'react-native';
import itemStyles from '../styles/item.styles';
import globalStyles from '../styles/global.styles';

const strings = getComponentStrings();

class Item extends React.Component {
	constructor(props) {
		super(props);
		this.onDeleteItem = this.onDeleteItem.bind(this);
		this.onUpdateItem = this.onUpdateItem.bind(this);
	}

	render() {
		return (
			<View>
				<Text>{this.props.item.symptoms}</Text>
				<Text>{this.props.item.location}</Text>
				<Text>{this.props.item.thoughts}</Text>
				<Text>
					{moment(this.props.item.date).format('dddd DD-MM-YYYY HH:mm')}
				</Text>
				<View style={globalStyles.rowContainer}>
					<View style={itemStyles.itemButtonsContainer}>
						<Button
							title={strings.deleteItemButton}
							onPress={this.onDeleteItem}
						/>
					</View>
					<View style={itemStyles.itemButtonsContainer}>
						<Button
							title={strings.updateItemButton}
							onPress={this.onUpdateItem}
						/>
					</View>
				</View>
			</View>
		);
	}

	onDeleteItem() {
		this.props.onDeleteItem(this.props.item);
	}

	onUpdateItem() {
		this.props.onUpdateItem(this.props.item);
	}
}

Item.propTypes = {
	item: PropTypes.shape({
		symptoms: PropTypes.string,
		location: PropTypes.string,
		thoughts: PropTypes.string,
		date: PropTypes.string
	}).isRequired,
	onDeleteItem: PropTypes.func.isRequired,
	onUpdateItem: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			deleteItemButton: 'Delete Item',
			updateItemButton: 'Update Item'
		},
		it: {
			deleteItemButton: 'Rimuovi Elemento',
			updateItemButton: 'Modifica Elemento'
		}
	});
}

export default Item;
