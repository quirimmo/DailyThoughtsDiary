import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import globalStyles from '../styles/global.styles';
import AddUpdateItem from '../components/AddUpdateItem.component';

class UpdateItemScreen extends React.Component {
	static navigationOptions = {
		title: 'Update Item'
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
					buttonTitle="Update Item"
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

export default UpdateItemScreen;
