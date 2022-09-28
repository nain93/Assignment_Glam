import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { logo } from '../assets/image';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'logo', title: '로고' },
    { key: 'near', title: '근처' },
    { key: 'live', title: '라이브' },
  ]);
  return (
    <TabView
      style={{ marginTop: getStatusBarHeight() }}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderTabBar={(p) =>
        <TabBar {...p}
          tabStyle={{
            paddingBottom: 0,
          }}
          indicatorStyle={{
            height: 2,
            backgroundColor: theme.colors.black,
          }}
          style={{
            marginVertical: 12,
            marginLeft: 8,
            backgroundColor: theme.colors.white,
            paddingHorizontal: 0,
            width: Dimensions.get('window').width / 1.75,
          }}
          renderLabel={({ route, focused }) => {
            if (route.title === '로고') {
              return (
                <View style={{
                  height: 44, justifyContent: 'center',
                }}>
                  <Image source={logo} />
                </View>
              );
            }
            return (
              <View style={{ height: 44, justifyContent: 'center' }}>
                <Text style={{
                  color: focused ? theme.colors.black : theme.colors.grayscale.gray2,
                  fontSize: 20,
                }}>{route.title}</Text>
              </View>
            );
          }
          }
        />}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'logo':
            return (
              <View>
                <Text>logo</Text>
              </View>
            );
          case 'near':
            return (
              <View>
                <Text>near</Text>
              </View>
            );
          case 'live':
            return (
              <View>
                <Text>feed</Text>
              </View>
            );
          default:
            return null;
        }
      }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
