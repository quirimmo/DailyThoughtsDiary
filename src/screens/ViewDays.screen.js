import React from 'react';
import { Alert, View } from 'react-native';
import { Divider } from 'react-native-elements';
import globalStyles from '../styles/global.styles';
import PDFPrinter from '../services/PDFPrinter';
import PrintPDFButton from '../components/PrintPDFButton.component';
import DaysList from '../components/DaysList.component';
import DailyItemsList from '../models/DailyItemsList';

export default class ViewDaysScreen extends React.Component {
	static navigationOptions = {
		title: 'View Days'
	};

	constructor(props) {
		super(props);
		this.state = { dailyItemsList: new DailyItemsList() };

		this.openViewItems = this.openViewItems.bind(this);
		this.loadItems = this.loadItems.bind(this);
		this.printPDF = this.printPDF.bind(this);
	}

	render() {
		return (
			<View style={globalStyles.mainContainer}>
				<PrintPDFButton onPrintPDF={this.printPDF} />
				<Divider style={globalStyles.standardDivider} />
				<DaysList
					days={this.state.dailyItemsList}
					onDayPressed={this.openViewItems}
				/>
			</View>
		);
	}

	async componentDidMount() {
		this.props.navigation.addListener('didFocus', this.loadItems);
	}

	async loadItems() {
		try {
			this.setState(prevState => ({
				dailyItemsList: prevState.dailyItemsList.resetCounters()
			}));
			await this.props.fetchItems();
			this.props.items.forEach(onEachItem.bind(this));
		} catch (error) {
			console.error(`Error fetching the items ${error}`);
			Alert.alert('Error fetching the items');
		}

		function onEachItem(item) {
			this.setState(prevState => ({
				dailyItemsList: prevState.dailyItemsList.addOrIncrementItem(item)
			}));
		}
	}

	printPDF() {
		PDFPrinter.printDays(this.state.dailyItemsList);
	}

	openViewItems(current) {
		this.props.navigation.navigate('ViewItems', {
			date: current.value
		});
	}
}
