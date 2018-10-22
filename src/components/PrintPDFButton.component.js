import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import viewItemsStyles from '../styles/view-items.styles';

class PrintPDFButton extends React.Component {
	render() {
		return (
			<View>
				<Button
					style={viewItemsStyles.printPDFButton}
					title="Save All As PDF"
					onPress={this.props.onPrintPDF}
				/>
			</View>
		);
	}
}

PrintPDFButton.propTypes = {
	onPrintPDF: PropTypes.func.isRequired
};

export default PrintPDFButton;
