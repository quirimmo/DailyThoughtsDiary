import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';
import AddItemScreenStyles from '../styles/add-item-screen.styles';
import globalStyles from '../styles/global.styles';

class AddItemRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };
		this.onChangeText = this.onChangeText.bind(this);
	}

	render() {
		return (
			<View style={AddItemScreenStyles.addItemRow}>
				<Text style={globalStyles.text}>{this.props.label}</Text>
				<TextInput
					value={this.state.value}
					style={globalStyles.textInput}
					placeholder={this.props.placeholder}
					onChangeText={this.onChangeText}
				/>
			</View>
		);
	}

	onChangeText(text) {
		this.setState({ value: text });
		this.props.onChangeText(text);
	}
}

AddItemRow.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired
};

export default AddItemRow;
