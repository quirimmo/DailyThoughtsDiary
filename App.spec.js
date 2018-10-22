import 'react-native';
import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

const mockCreateTables = jest.fn();
jest.mock('./src/services/SQLiteProxy', () => ({
	getInstance: () => ({ createTables: mockCreateTables })
}));
jest.mock('moment', () => () => ({
	format: () => '2018–01–30T12:34:56+00:00'
}));

import App from './App';

describe('App snapshot', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	it('renders the loading screen', async () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders the root without loading screen', async () => {
		const tree = renderer.create(<App skipLoadingScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('componentDidMount', () => {
		let appInstance;
		beforeEach(() => {
			appInstance = renderer.create(<App />).getInstance();
		});

		it('should call che createTables method of SQLiteProxy', () => {
			appInstance.componentDidMount();
			expect(mockCreateTables).toHaveBeenCalled();
		});
	});
});
