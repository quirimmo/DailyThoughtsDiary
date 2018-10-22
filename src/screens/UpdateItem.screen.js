import React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import { View, Alert } from 'react-native';
import globalStyles from '../styles/global.styles';
import AddUpdateItem from '../components/AddUpdateItem.component';

const strings = getComponentStrings();

class UpdateItemScreen extends React.Component {
	static navigationOptions = {
		title: strings.title
	};

	currentItem;

	constructor(props) {
		super(props);

		this.state = {
			currentItem: this.props.navigation.getParam('item')
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
			const resp = await this.props.updateItem(item);
			Alert.alert(resp);
		} catch (error) {
			Alert.alert(error);
		}
	}
}

UpdateItemScreen.propTypes = {
	updateItem: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			title: 'Update Item',
			submitButton: 'Update Item'
		},
		it: {
			title: 'Modifica Elemento',
			submitButton: 'Modifica Elemento'
		}
	});
}

export default UpdateItemScreen;
