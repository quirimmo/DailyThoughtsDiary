import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import DaysList from './DaysList.component';

const days = [
	{
		count: 2,
		value: '2018-10-28T22:00:46.723Z'
	},
	{
		count: 1,
		value: '2018-12-25T14:00:46.723Z'
	}
];
const mockOnDayPressed = jest.fn();
let component;

describe('DaysList', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<DaysList days={days} onDayPressed={mockOnDayPressed} />
		);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(DaysList).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
});
