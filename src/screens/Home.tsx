import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { close, info, logo, setting } from '../assets/icon';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationRoute } from 'react-navigation';
import { useQuery } from 'react-query';
import { getTodayRecommend } from '../api/home';
import FastImage from 'react-native-fast-image';
import { FONT } from '../styles/font';
import LinearGradient from 'react-native-linear-gradient';

interface HomePropType {
  navigation: NavigationStackProp;
  route: NavigationRoute;
}

interface TodayRecommendType {
  data: {
    id: number,
    age: number,
    company: string,
    distance: number,
    height: number,
    introduction: string,
    job: string,
    location: string,
    name: string,
    pictures: string[]
  }[]
}

const Home = ({ navigation }: HomePropType) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'logo', title: '로고' },
    { key: 'near', title: '근처' },
    { key: 'live', title: '라이브' },
  ]);

  const { data: TodayList } = useQuery<TodayRecommendType, Error>('getTodayRecommend', getTodayRecommend);

  return (
    <TabView
      style={{ marginTop: getStatusBarHeight() }}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderTabBar={(p) =>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
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
                  <Text style={[FONT.SemiBold, {
                    color: focused ? theme.colors.black : theme.colors.grayscale.gray2,
                    fontSize: 20,
                  }]}>{route.title}</Text>
                </View>
              );
            }}
          />
          <Pressable onPress={() => navigation.navigate('Mypage')}>
            <Image source={setting} style={{ marginRight: 12 }} />
          </Pressable>
        </View>
      }
      renderScene={({ route }) => {
        switch (route.key) {
          case 'logo':
            return (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={TodayList?.data}
                renderItem={({ item }) => (
                  <>
                    <View style={{
                      backgroundColor: 'green',
                      width: Dimensions.get('window').width - 10,
                      aspectRatio: 0.6,
                      borderRadius: 5,
                      marginHorizontal: 5,
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                      marginBottom: 12,
                    }}>
                      <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', '#333333']}
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          width: Dimensions.get('window').width - 10,
                          aspectRatio: 0.6,
                          borderRadius: 5,
                        }} />

                      <View style={{
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        width: 100,
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 'auto',
                        zIndex: 2,
                      }}>
                        <Text style={[FONT.Regular, {
                          color: theme.colors.white,
                          fontSize: 14,
                          textAlign: 'center',
                        }]}>오늘의 추천</Text>
                      </View>

                      <View style={{
                        marginTop: 12,
                        flexDirection: 'row', alignItems: 'center',
                        zIndex: 2,
                      }}>
                        <Text style={[FONT.SemiBold, {
                          fontSize: 24, color: theme.colors.white,
                        }]}>
                          {`${item.name}, ${item.age}`}
                        </Text>
                        <Image source={info} style={{ marginLeft: 4 }} />
                      </View>

                      {item.introduction ?
                        <Text style={[FONT.Regular, {
                          marginTop: 8,
                          fontSize: 16, color: theme.colors.white,
                          zIndex: 2,
                        }]}>
                          {item.introduction}
                        </Text>
                        :
                        <View style={{ zIndex: 2 }}>
                          <Text style={[FONT.Regular, {
                            marginTop: 8,
                            fontSize: 16, color: theme.colors.white,
                          }]}>
                            {item.job} · {item.distance > 1000 ? `${item.distance / 1000}k` : item.distance}m
                          </Text>
                          <Text style={[FONT.Regular, {
                            fontSize: 16, color: theme.colors.white,
                            opacity: 0.6, marginTop: 4,
                          }]}>
                            {item.height}cm
                          </Text>
                        </View>
                      }

                      <View style={{ marginTop: 20, flexDirection: 'row', zIndex: 2 }}>
                        <TouchableOpacity style={{
                          width: 48, height: 48,
                          backgroundColor: theme.colors.grayscale.darkGray1,
                          justifyContent: 'center', alignItems: 'center', borderRadius: 5,
                        }}>
                          <Image source={close} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                          backgroundColor: theme.colors.glamBlue,
                          marginLeft: 8,
                          justifyContent: 'center', alignItems: 'center',
                          borderRadius: 5,
                          width: Dimensions.get('window').width - 98,
                        }}>
                          <Text style={[FONT.SemiBold, {
                            fontSize: 14, color: theme.colors.white,
                          }]}>좋아요</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <FastImage source={require(item.pictures[0])} /> */}
                  </>
                )}
              />
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
