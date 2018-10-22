import moment from 'moment';
import * as React from 'react';
import LocalizedStrings from 'react-localization';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import AddItemRow from './AddItemRow.component';
import ItemTime from './ItemTime.component';
import addItemScreenStyles from '../styles/add-item-screen.styles';

const strings = getComponentStrings();

class AddUpdateItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItem: this.props.currentItem
		};
		this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
		this.changeItemText = this.changeItemText.bind(this);
		this.onSetTime = this.onSetTime.bind(this);
		this.onSubmitItem = this.onSubmitItem.bind(this);
	}

	render() {
		return (
			<View>
				<AddItemRow
					value={this.state.currentItem.symptoms}
					label={strings.symptomsLabel}
					placeholder={strings.symptomsPlaceholder}
					onChangeText={text => {
						this.changeItemText('symptoms', text);
					}}
				/>
				<AddItemRow
					value={this.state.currentItem.location}
					label={strings.locationLabel}
					placeholder={strings.locationPlaceholder}
					onChangeText={text => {
						this.changeItemText('location', text);
					}}
				/>
				<AddItemRow
					value={this.state.currentItem.thoughts}
					label={strings.thoughtsLabel}
					placeholder={strings.thoughtsPlaceholder}
					onChangeText={text => {
						this.changeItemText('thoughts', text);
					}}
				/>
				<View style={addItemScreenStyles.addItemRow}>
					<ItemTime
						date={this.state.currentItem.date}
						onSetTime={this.onSetTime}
					/>
				</View>
				<View style={addItemScreenStyles.submitRow}>
					<Button
						disabled={this.isSubmitDisabled()}
						title={this.props.buttonTitle}
						onPress={this.onSubmitItem}
					/>
				</View>
			</View>
		);
	}

	isSubmitDisabled() {
		return (
			!this.state.currentItem.symptoms ||
			!this.state.currentItem.thoughts ||
			!this.state.currentItem.location
		);
	}

	changeItemText(property, value) {
		this.setState(prevState => ({
			currentItem: { ...prevState.currentItem, ...{ [property]: value } }
		}));
	}

	onSetTime(hours, minutes) {
		this.setState(prevState => ({
			currentItem: {
				...prevState.currentItem,
				...{
					date: moment(prevState.currentItem.date)
						.hours(hours)
						.minutes(minutes)
				}
			}
		}));
	}

	onSubmitItem() {
		this.props.onSubmitItem(this.state.currentItem);
	}
}

AddUpdateItem.propTypes = {
	currentItem: PropTypes.shape({
		symptoms: PropTypes.string,
		location: PropTypes.string,
		thoughts: PropTypes.string,
		date: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	}).isRequired,
	buttonTitle: PropTypes.string.isRequired,
	onSubmitItem: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			symptomsLabel: 'Symptoms:',
			locationLabel: 'Location:',
			thoughtsLabel: 'Thoughts:',
			symptomsPlaceholder: 'Type symptoms...',
			locationPlaceholder: 'Type where you are...',
			thoughtsPlaceholder: 'Type thoughts...'
		},
		it: {
			symptomsLabel: 'Sintomi:',
			locationLabel: 'Luogo:',
			thoughtsLabel: 'Pensieri:',
			symptomsPlaceholder: 'Inserisci i sintomi...',
			locationPlaceholder: 'Inserisci dove ti trovi...',
			thoughtsPlaceholder: 'Inserisci i pensieri...'
		}
	});
}

export default AddUpdateItem;
