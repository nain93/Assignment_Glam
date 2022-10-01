import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { close, info } from '../assets/icon';
import { FONT } from '../styles/font';
import theme from '../styles/theme';
import { RecommendCardType } from '../types';
import FastImage from 'react-native-fast-image';

interface RecommendCardPropType {
  card: RecommendCardType,
  cardIndex: number
}

const RecommendCard = ({ card, cardIndex }: RecommendCardPropType) => {

  return (
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
      {(cardIndex === 0 || cardIndex === 1) &&
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
      }
      {/* <FastImage source={require(`../assets${card.pictures[0]}`)} style={{ width: 100, height: 100 }} /> */}

      <View style={{
        marginTop: (cardIndex === 0 || cardIndex === 1) ? 12 : 'auto',
        flexDirection: 'row', alignItems: 'center',
        zIndex: 2,
      }}>
        <Text style={[FONT.SemiBold, {
          fontSize: 24, color: theme.colors.white,
        }]}>
          {`${card.name}, ${card.age}`}
        </Text>
        <Image source={info} style={{ marginLeft: 4 }} />
      </View>

      {card.introduction ?
        <Text style={[FONT.Regular, {
          marginTop: 8,
          fontSize: 16, color: theme.colors.white,
          zIndex: 2,
        }]}>
          {card.introduction}
        </Text>
        :
        <View style={{ zIndex: 2 }}>
          <Text style={[FONT.Regular, {
            marginTop: 8,
            fontSize: 16, color: theme.colors.white,
          }]}>
            {card.job} · {card.distance > 1000 ? `${card.distance / 1000}k` : card.distance}m
          </Text>
          <Text style={[FONT.Regular, {
            fontSize: 16, color: theme.colors.white,
            opacity: 0.6, marginTop: 4,
          }]}>
            {card.height}cm
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
  );
};

export default RecommendCard;

const styles = StyleSheet.create({});
