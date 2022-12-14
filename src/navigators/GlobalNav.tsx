import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNav';


const Stack = createStackNavigator();

const GlobalNav = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNav"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default GlobalNav;
