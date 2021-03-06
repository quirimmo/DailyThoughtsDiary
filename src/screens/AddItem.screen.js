import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LocalizedStrings from 'react-localization';
import { View, Alert } from 'react-native';
import Item from '../models/Item';
import globalStyles from '../styles/global.styles';
import AddUpdateItem from '../components/AddUpdateItem.component';

const strings = getComponentStrings();

class AddItemScreen extends React.Component {
	static navigationOptions = {
		title: strings.title
	};

	constructor(props) {
		super(props);

		this.state = {
			currentItem: new Item(moment())
		};
		this.onSubmitItem = this.onSubmitItem.bind(this);
	}

	render() {
		return (
			<View style={globalStyles.screenContainer}>
				<AddUpdateItem
					currentItem={this.state.currentItem}
					onSubmitItem={this.onSubmitItem}
					buttonTitle={strings.submitButton}
				/>
			</View>
		);
	}

	async onSubmitItem(item) {
		try {
			const resp = await this.props.addItem(item);
			Alert.alert(resp);
		} catch (error) {
			Alert.alert(error);
		}
	}
}

AddItemScreen.propTypes = {
	addItem: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			title: 'Add Item',
			submitButton: 'Save Item'
		},
		it: {
			title: 'Aggiungi Elemento',
			submitButton: 'Salva Elemento'
		}
	});
}

export default AddItemScreen;
