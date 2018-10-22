import * as React from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';
import { Button, View } from 'react-native';
import viewItemsStyles from '../styles/view-items.styles';

const strings = getComponentStrings();

class PrintPDFButton extends React.Component {
	render() {
		return (
			<View>
				<Button
					style={viewItemsStyles.printPDFButton}
					title={strings.saveAsPDFButton}
					onPress={this.props.onPrintPDF}
				/>
			</View>
		);
	}
}

PrintPDFButton.propTypes = {
	onPrintPDF: PropTypes.func.isRequired
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			saveAsPDFButton: 'Save As PDF'
		},
		it: {
			saveAsPDFButton: 'Salva Come PDF'
		}
	});
}

export default PrintPDFButton;
