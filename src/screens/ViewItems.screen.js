import React from 'react';
import { View, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import globalStyles from '../styles/global.styles';
import PDFPrinter from '../services/PDFPrinter';
import PrintPDFButton from '../components/PrintPDFButton.component';
import ItemsList from '../components/ItemsList.component';

export default class ViewItemsScreen extends React.Component {
	static navigationOptions = {
		title: 'View Items'
	};

	constructor(props) {
		super(props);

		this.deleteItem = this.deleteItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.printPDF = this.printPDF.bind(this);
	}

	render() {
		return (
			<View style={globalStyles.mainContainer}>
				<PrintPDFButton onPrintPDF={this.printPDF} />
				<Divider style={globalStyles.standardDivider} />
				<ItemsList
					items={this.props.items}
					onDeleteItem={this.deleteItem}
					onUpdateItem={this.updateItem}
				/>
			</View>
		);
	}

	printPDF() {
		PDFPrinter.printItems(this.props.items);
	}

	async deleteItem(item) {
		try {
			await this.props.deleteItem(item);
			Alert.alert('Item deleted correctly');
		} catch (error) {
			Alert.alert(error);
		}
	}

	updateItem(item) {
		this.props.navigation.navigate('UpdateItem', { item });
	}
}
