import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { dia, glamour, logo, setting, today, withpet } from '../assets/icon';
import { useQuery } from 'react-query';
import { getMoreRecommend, getTodayRecommend } from '../api/home';
import FastImage from 'react-native-fast-image';
import { FONT } from '../styles/font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/TabNav';
import RecommendCard from '../components/RecommendCard';
import { RecommendCardType } from '../types';
import CustomRecommend from '../components/CustomRecommend';

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
                    {cardIndex === 1 &&
                      <View style={{ marginTop: 12, marginBottom: 24, marginHorizontal: 16 }}>
                        <Text style={[FONT.SemiBold, {
                          marginBottom: 12,
                          fontSize: 20, color: theme.colors.black,
                        }]}>
                          맞춤 추천
                        </Text>
                        <CustomRecommend title="글램 추천" image={today} viewStyle={{ marginVertical: 11 }} />
                        <CustomRecommend title="최상위 매력" image={dia} viewStyle={{ marginVertical: 11 }} />
                        <CustomRecommend title="볼륨감 있는 체형" image={glamour} viewStyle={{ height: 62 }} />
                        <CustomRecommend title="반려 동물을 키우는" image={withpet} isHot={false} viewStyle={{ height: 62 }} />
                        <TouchableOpacity style={{
                          height: 44,
                          marginVertical: 16,
                          borderRadius: 5,
                          backgroundColor: theme.colors.grayscale.gray1,
                          justifyContent: 'center',
                        }}>
                          <Text style={[FONT.SemiBold, { textAlign: 'center', color: theme.colors.black }]}>
                            24개 항목 모두 보기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    }
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
