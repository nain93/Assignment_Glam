import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { hot, logo, setting, today } from '../assets/icon';
import { useQuery } from 'react-query';
import { getMoreRecommend, getTodayRecommend } from '../api/home';
import FastImage from 'react-native-fast-image';
import { FONT } from '../styles/font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/TabNav';
import RecommendCard from '../components/RecommendCard';
import { RecommendCardType } from '../types';

type HomePropType = NativeStackScreenProps<RootStackParamList, 'Home'>

interface RecommendQueryType {
  data: RecommendCardType[]
}

const Home = ({ navigation }: HomePropType) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'logo', title: '로고' },
    { key: 'near', title: '근처' },
    { key: 'live', title: '라이브' },
  ]);

  const { data: TodayList } = useQuery<RecommendQueryType, Error>('getTodayRecommend', getTodayRecommend);
  const { data: MoreList } = useQuery<RecommendQueryType, Error>('getMoreRecommend', getMoreRecommend);

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
                data={TodayList?.data.concat(MoreList?.data || [])}
                renderItem={({ item, index: cardIndex }) => (
                  <>
                    {/* 추천카드 */}
                    <RecommendCard card={item} cardIndex={cardIndex} />
                    {/* 맞춤추천  컴포넌트로 빼자*/}
                    <View style={{ marginTop: 12, marginBottom: 24, marginHorizontal: 16 }}>
                      <Text style={[FONT.SemiBold, {
                        marginBottom: 12,
                        fontSize: 20, color: theme.colors.black,
                      }]}>
                        맞춤 추천
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={today} style={{ width: 40, marginRight: 12 }} />
                        <Text style={[FONT.Regular, { fontSize: 14 }]}>글램 추천 </Text>
                        <Image source={hot} style={{ marginRight: 'auto' }} />
                        <Pressable style={{
                          backgroundColor: theme.colors.glamBlue,
                          width: 76, height: 32, borderRadius: 5,
                          justifyContent: 'center', alignItems: 'center',
                        }}>
                          <Text style={[FONT.SemiBold, { fontSize: 14, color: theme.colors.white }]}>
                            선택
                          </Text>
                        </Pressable>
                      </View>
                    </View>
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
