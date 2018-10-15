import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon.component';
import AddItemContainer from '../containers/AddItem.container';

const AddItemStack = createStackNavigator({
	AddItem: AddItemContainer
});

AddItemStack.navigationOptions = {
	tabBarLabel: 'Add Item',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	)
};

export default AddItemStack;
