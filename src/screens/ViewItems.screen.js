import React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import { View, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import globalStyles from '../styles/global.styles';
import PDFPrinter from '../services/PDFPrinter';
import PrintPDFButton from '../components/PrintPDFButton.component';
import ItemsList from '../components/ItemsList.component';

const strings = getComponentStrings();

class ViewItemsScreen extends React.Component {
	static navigationOptions = {
		title: strings.title
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

ViewItemsScreen.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			symptoms: PropTypes.string,
			location: PropTypes.string,
			thoughts: PropTypes.string,
			date: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		})
	).isRequired,
	deleteItem: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			title: 'View Items'
		},
		it: {
			title: 'Visualizza Elementi'
		}
	});
}

export default ViewItemsScreen;
