import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { dia, glamour, logo, setting, today, withpet } from '../assets/icon';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAddMoreRecommend, getMoreRecommend, getTodayRecommend } from '../api/home';
import { FONT } from '../styles/font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/TabNav';
import RecommendCard from '../components/RecommendCard';
import { RecommendCardType, RecommendQueryType } from '../types';
import CustomRecommend from '../components/CustomRecommend';

type HomePropType = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomePropType) => {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'logo', title: '로고' },
    { key: 'near', title: '근처' },
    { key: 'live', title: '라이브' },
  ]);

  const { data: todayList } = useQuery<{ data: Array<RecommendCardType & { today?: boolean }> }, Error>('getTodayRecommend',
    async () => {
      const queryData: { data: Array<RecommendCardType & { today?: boolean }> }
        = await getTodayRecommend();
      return {
        data: queryData?.data.map(v => {
          return { ...v, today: true };
        }),
      };
    });
  const { data: moreList } = useQuery<RecommendQueryType, Error>('getMoreRecommend', getMoreRecommend);

  const { mutate: addMutate } = useMutation('getAddMore', ({ url, method }: { url: string, method: 'get' }) =>
    getAddMoreRecommend({ url, method }),
    {
      onSuccess: (addList) => {
        queryClient.setQueryData<RecommendQueryType>('getMoreRecommend', (list) => {
          return { ...addList, data: list?.data.concat(addList.data) };
        });
      },
    });

  return (
    <TabView
      style={{ marginTop: isIphoneX() ? getStatusBarHeight() : 0 }}
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
              paddingVertical: 0,
              elevation: 0,
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
              elevation: 0,
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
                keyExtractor={v => v.id.toString()}
                onEndReached={() => {
                  if (moreList?.meta.next) {
                    addMutate({ url: moreList?.meta.next.url, method: moreList?.meta.next.method });
                  }
                }}
                showsVerticalScrollIndicator={false}
                data={todayList?.data.concat(moreList?.data || [])}
                renderItem={({ item, index: cardIndex }) => (
                  <>
                    {/* 추천카드 */}
                    <RecommendCard card={item} cardIndex={cardIndex} />
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
                          marginTop: 16,
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
