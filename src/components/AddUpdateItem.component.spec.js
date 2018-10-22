import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import moment from 'moment';

jest.mock('NativeAnimatedHelper');

import AddUpdateItem from './AddUpdateItem.component';

const mockOnSubmitItem = jest.fn();
const item = {
	symptoms: 'symptoms',
	location: 'location',
	thoughts: 'thoughts',
	date: '2018-10-28T22:00:46.723Z'
};
let component;
let instance;

describe('AddUpdateItem', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<AddUpdateItem
				currentItem={item}
				onSubmitItem={mockOnSubmitItem}
				buttonTitle="button-title"
			/>
		);
		instance = component.getInstance();
	});
	afterEach(() => {
		instance.setState({ currentItem: instance.state.currentItem });
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(AddUpdateItem).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('state', () => {
		it('should init the currentItem property', () => {
			expect(instance.state.currentItem).toEqual(item);
		});
	});

	describe('isSubmitDisabled', () => {
		it('should return false', () => {
			expect(instance.isSubmitDisabled()).toBeFalsy();
		});

		it('should return true', () => {
			instance.setState({
				currentItem: { ...instance.state.currentItem, symptoms: '' }
			});
			expect(instance.isSubmitDisabled()).toBeTruthy();
		});

		it('should return true', () => {
			instance.setState({
				currentItem: { ...instance.state.currentItem, location: '' }
			});
			expect(instance.isSubmitDisabled()).toBeTruthy();
		});

		it('should return true', () => {
			instance.setState({
				currentItem: { ...instance.state.currentItem, thoughts: '' }
			});
			expect(instance.isSubmitDisabled()).toBeTruthy();
		});

		it('should return true', () => {
			instance.setState({
				currentItem: { location: '', thoughts: '', symptoms: '' }
			});
			expect(instance.isSubmitDisabled()).toBeTruthy();
		});
	});

	describe('changeItemText', () => {
		it('should change the property of the currentItem in the state with the given value', () => {
			instance.changeItemText('testProperty', 'testValue');
			expect(instance.state.currentItem.testProperty).toEqual('testValue');
		});
	});

	describe('onSetTime', () => {
		it('should set the date property of the currentItem in the state', () => {
			instance.onSetTime(10, 20);
			expect(moment('2018-10-28T10:20:46.723').isSame(instance.state.currentItem.date)).toBeTruthy();
		});
	});

	describe('onSubmitItem', () => {
		it('should call the onSubmitItem prop', () => {
			instance.onSubmitItem();
			expect(mockOnSubmitItem).toHaveBeenCalledWith(instance.state.currentItem);
		});
	});
});
