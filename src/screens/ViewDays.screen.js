import React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import { Alert, View } from 'react-native';
import { Divider } from 'react-native-elements';
import globalStyles from '../styles/global.styles';
import PDFPrinter from '../services/PDFPrinter';
import PrintPDFButton from '../components/PrintPDFButton.component';
import DaysList from '../components/DaysList.component';
import DailyItemsList from '../models/DailyItemsList';

const strings = getComponentStrings();

class ViewDaysScreen extends React.Component {
	static navigationOptions = {
		title: strings.title
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
			Alert.alert(`Error fetching the items ${error}`);
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

ViewDaysScreen.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			symptoms: PropTypes.string,
			location: PropTypes.string,
			thoughts: PropTypes.string,
			date: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		})
	),
	fetchItems: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			title: 'View Days'
		},
		it: {
			title: 'Visualizza Giorni'
		}
	});
}

export default ViewDaysScreen;
