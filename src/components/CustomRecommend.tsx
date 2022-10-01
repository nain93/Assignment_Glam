import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { FONT } from '../styles/font';
import { hot } from '../assets/icon';
import theme from '../styles/theme';
import { getCustomRecommend } from '../api/home';
import { useMutation, useQueryClient } from 'react-query';
import { RecommendQueryType } from '../types';

interface CustomRecommendPropType {
  title: '글램 추천' | '최상위 매력' | '볼륨감 있는 체형' | '반려 동물을 키우는',
  image: ImageSourcePropType,
  viewStyle?: ViewStyle,
  isHot?: boolean
}

const CustomRecommend = ({ title, image, viewStyle, isHot = true }: CustomRecommendPropType) => {
  const queryClient = useQueryClient();
  const { mutate: customMutate } = useMutation('getCustomRecommend', getCustomRecommend, {
    onSuccess: (addList) => {
      queryClient.setQueryData<RecommendQueryType>('getTodayRecommend', (list) => {
        return { ...addList, data: addList.data.concat(list?.data) };
      });
    },
  });

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', height: 40 }, viewStyle]}>
      <Image source={image} style={{ marginRight: 12 }} />
      <Text style={[FONT.Regular, { fontSize: 14 }]}>{title} </Text>
      {isHot &&
        <Image source={hot} />
      }
      <TouchableOpacity
        onPress={() => customMutate()}
        style={{
          backgroundColor: theme.colors.glamBlue,
          width: 76, height: 32, borderRadius: 5,
          justifyContent: 'center', alignItems: 'center',
          marginLeft: 'auto',
        }}>
        <Text style={[FONT.SemiBold, { fontSize: 14, color: theme.colors.white }]}>
          선택
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomRecommend;

const styles = StyleSheet.create({});
