// import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import AddItemStack from './AddItemStack.navigator';
import ViewItemsStack from './ViewItemsStack.navigator';

export default createBottomTabNavigator({
	AddItemStack,
	ViewItemsStack
});
