import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { Button } from 'react-native';
import renderer from 'react-test-renderer';
import PrintPDFButton from './PrintPDFButton.component';

const mockOnPrintPDF = jest.fn();
let component;

describe('PrintPDFButton', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(<PrintPDFButton onPrintPDF={mockOnPrintPDF} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(PrintPDFButton).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('onPrintPDF', () => {
		it('should be called by the onPress prop of the button', () => {
			const button = component.root.findByType(Button);
			button.props.onPress();
			expect(mockOnPrintPDF).toHaveBeenCalled();
		});
	});
});
