import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Mypage from '../screens/Mypage';
import Live from '../screens/Live';
import theme from '../styles/theme';
import { connection, home, live, more, station } from '../assets/icon';
import Station from '../screens/Station';
import Connection from '../screens/Connection';

export type RootStackParamList = {
  Home: undefined;
  Live: undefined;
  Station: undefined;
  Connection: undefined;
  Mypage: undefined;
};

const Tabs = createBottomTabNavigator<RootStackParamList>();


const TabNavigator = () => {
  return (
    <Tabs.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.colors.white,
      }}
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Live"
        component={Live}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={live}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Station"
        component={Station}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={station}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Connection"
        component={Connection}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={connection}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Mypage"
        component={Mypage}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 28, height: 28 }}
              source={more}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
