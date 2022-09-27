import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Mypage from '../screens/Mypage';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
