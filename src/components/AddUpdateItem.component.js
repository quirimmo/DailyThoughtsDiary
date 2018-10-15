import moment from 'moment';
import * as React from 'react';
import { View, Button } from 'react-native';
import AddItemRow from './AddItemRow.component';
import ItemTime from './ItemTime.component';
import addItemScreenStyles from '../styles/add-item-screen.styles';

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
					label="Symptoms:"
					placeholder="Type symptoms..."
					onChangeText={text => {
						this.changeItemText('symptoms', text);
					}}
				/>
				<AddItemRow
					value={this.state.currentItem.location}
					label="Location:"
					placeholder="Type where you are..."
					onChangeText={text => {
						this.changeItemText('location', text);
					}}
				/>
				<AddItemRow
					value={this.state.currentItem.thoughts}
					label="Thoughts:"
					placeholder="Type thoughts..."
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
				...{ date: moment(prevState.date).hours(hours).minutes(minutes) }
			}
		}));
	}

	onSubmitItem() {
		this.props.onSubmitItem(this.state.currentItem);
	}
}

export default AddUpdateItem;
