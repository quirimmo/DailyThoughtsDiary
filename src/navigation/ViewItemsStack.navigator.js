import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon.component';
import ViewItemsContainer from '../containers/ViewItems.container';
import ViewDaysContainer from '../containers/ViewDays.container';
import UpdateItemContainer from '../containers/UpdateItem.container';

const ViewItemsStack = createStackNavigator({
	ViewDays: ViewDaysContainer,
	ViewItems: ViewItemsContainer,
	UpdateItem: UpdateItemContainer
});

ViewItemsStack.navigationOptions = {
	tabBarLabel: 'View Items',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-link${focused ? '' : '-outline'}`
					: 'md-link'
			}
		/>
	)
};

export default ViewItemsStack;
