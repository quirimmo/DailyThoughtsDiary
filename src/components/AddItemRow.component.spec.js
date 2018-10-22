import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import AddItemRow from './AddItemRow.component';

const mockOnChangeText = jest.fn();
let component;
let instance;

describe('AddItemRow', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<AddItemRow
				value="value"
				label="label"
				placeholder="placeholder"
				onChangeText={mockOnChangeText}
			/>
		);
		instance = component.getInstance();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(AddItemRow).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('state', () => {
		it('should init the value property', () => {
			expect(instance.state.value).toEqual('value');
		});
	});

	describe('onChangeText', () => {
		let textInput;
		beforeEach(() => {
			textInput = component.root.find(element => element.type === 'TextInput');
		});

		it('should set the value property of the state to the given value', () => {
			textInput.props.onChangeText('input-text');
			expect(instance.state.value).toEqual('input-text');
		});

		it('should call the onChangeText prop', () => {
			textInput.props.onChangeText('input-text');
			expect(mockOnChangeText).toHaveBeenCalledWith('input-text');
		});
	});
});
