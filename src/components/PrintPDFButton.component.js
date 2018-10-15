import * as React from 'react';
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

export default PrintPDFButton;
