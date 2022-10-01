import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { person } from '../assets/image';
import { FONT } from '../styles/font';
import theme from '../styles/theme';
import { useQuery } from 'react-query';
import { getProfile } from '../api/mypage';
import Modal from 'react-native-modal';

interface ProfileType {
  birthday: string,
  body_type: string,
  company: string,
  education?: string,
  gender: string,
  height: string,
  id: number,
  introduction: string,
  job: string,
  location: string,
  name: string,
  pictures: string[],
}

interface ProfileDataType {
  data: ProfileType,
  meta: {
    body_types: Array<any>,
    educations: Array<any>,
    genders: Array<any>,
    height_range: Array<any>
  }
}


const Mypage = () => {
  const [heightArr, setHeightArr] = useState<string[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{
    headerTitle: string,
    children: JSX.Element
  }>();

  const [profileInfo, setProfileInfo] = useState<ProfileType>({
    introduction: '',
    height: '',
    birthday: '',
    body_type: '',
    company: '',
    education: '',
    gender: '',
    id: 0,
    job: '',
    location: '',
    name: '',
    pictures: [],
  });

  const { data: profile } = useQuery<ProfileDataType, Error>('getProfile', getProfile);



  useEffect(() => {
    let height = 120;
    const arr: string[] = [];
    while (height < 201) {
      if (height === 120) {
        arr.push(height.toString() + 'cm 이하');
      }
      else if (height === 200) {
        arr.push(height.toString() + 'cm 이상');
      }
      else {
        arr.push(height.toString() + 'cm');
      }
      height++;
    }
    setHeightArr(arr);
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileInfo({ ...profile.data, height: `${profile.data.height}cm` });
    }
  }, [profile]);

  // console.log(profile?.meta, 'profile?.data');
  return (
    <>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Image source={person} style={styles.personCard} />
          <Image source={person} style={[styles.personCard, { marginHorizontal: 2.5 }]} />
          <Image source={person} style={styles.personCard} />
          <Image source={person} style={styles.personCard} />
          <Image source={person} style={[styles.personCard, { marginHorizontal: 2.5 }]} />
          <Image source={person} style={styles.personCard} />
        </View>

        <View style={{
          height: 44, justifyContent: 'center', alignItems: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.colors.grayscale.gray1,
        }}>
          <Text style={[FONT.Regular, { fontSize: 12, color: theme.colors.grayscale.gray4 }]}>
            다양한 매력을 보여줄 수 있는 사진을 올려주세요
            <Text style={[FONT.SemiBold, { color: theme.colors.grayscale.darkGray1 }]}>
              {' 더 알아보기'}
            </Text>
          </Text>
        </View>

        <View style={{
          paddingVertical: 16,
        }}>
          <View style={styles.infoCard}>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
              닉네임
            </Text>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
              {profile?.data.name}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
              성별
            </Text>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '65%' }]}>
              {profile?.data.gender}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
              생일
            </Text>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
              {profile?.data.birthday}
            </Text>
          </View>

          <View style={[styles.infoCard, { marginBottom: 8 }]}>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
              위치
            </Text>
            <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
              {profile?.data.location}
            </Text>
          </View>

          <View style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.colors.grayscale.gray1,
            paddingVertical: 24,
            paddingHorizontal: 16,
          }}>
            <Text style={[FONT.Regular, styles.profileTitle, { height: 35 }]}>
              소개
            </Text>

            <TextInput
              value={profileInfo.introduction}
              style={[FONT.Regular, {
                color: theme.colors.glamBlue,
              }]}
              placeholder="회원님의 매력을 간단하게 소개해주세요"
              placeholderTextColor={theme.colors.grayscale.gray2}
              onChangeText={(e) => setProfileInfo({ ...profileInfo, introduction: e })}
            />

            <Text style={[FONT.Regular, { fontSize: 12, color: theme.colors.grayscale.gray4, marginTop: 10 }]}>
              SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다
            </Text>
          </View>

          <View style={{
            paddingVertical: 8, borderBottomWidth: 1,
            borderBottomColor: theme.colors.grayscale.gray1,
          }}>
            <Pressable
              onPress={() => {
                setModalOpen(true);
                setModalInfo({
                  children: (
                    <>
                      {React.Children.toArray(heightArr?.map((heightValue, index) => {
                        return (
                          <TouchableOpacity onPress={() => {
                            setProfileInfo({ ...profileInfo, height: heightValue });
                            setModalOpen(false);
                          }}>
                            <Text style={[FONT.Regular, { marginBottom: index === heightArr.length - 1 ? 0 : 20 }]}>
                              {heightValue}
                            </Text>
                          </TouchableOpacity>
                        );
                      }))}
                    </>
                  ),
                  headerTitle: '키',
                });
              }}
              style={styles.infoCard}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                키
              </Text>
              {profileInfo.height &&
                <Text style={[FONT.Regular, {
                  color: theme.colors.glamBlue,
                }]}>{profileInfo.height}</Text>}
            </Pressable>

            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                체형
              </Text>

              <TextInput
                value={profileInfo.body_type}
                style={[FONT.Regular, {
                  color: theme.colors.glamBlue,
                }]}
                placeholder="입력해주세요"
                placeholderTextColor={theme.colors.grayscale.gray2}
                onChangeText={(e) => setProfileInfo({ ...profileInfo, body_type: e })}
              />

            </View>
          </View>

          <View style={{ paddingVertical: 8 }}>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                직장
              </Text>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
                {profile?.data.company}
              </Text>
            </View>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                직업
              </Text>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
                {profile?.data.job}
              </Text>
            </View>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                학력
              </Text>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
                {profile?.data.education}
              </Text>
            </View>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                학교
              </Text>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '65%', color: theme.colors.glamBlue }]}>
                {profile?.data.education}
              </Text>
            </View>
          </View>

        </View>
        {modalOpen &&
          <Modal
            isVisible={modalOpen}
            hideModalContentWhileAnimating={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => setModalOpen(false)}
            backdropTransitionOutTiming={0}
            onBackButtonPress={() => setModalOpen(false)}
          >
            <View style={styles.modalWrap}>
              <View style={{
                borderBottomColor: theme.colors.grayscale.gray1,
                borderBottomWidth: 1,
                paddingVertical: 20,
              }}>
                <Text style={[FONT.SemiBold, { textAlign: 'center', fontSize: 16 }]}>
                  {modalInfo?.headerTitle}
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}
                style={{ height: 500 }}
              >
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  {modalInfo?.children}
                </View>
              </ScrollView>
            </View>
          </Modal>}
      </ScrollView >
    </>
  );
};

export default Mypage;

const styles = StyleSheet.create({
  personCard: {
    width: (Dimensions.get('window').width / 3) - 5,
    marginBottom: 2.5,
  },
  infoCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  profileTitle: {
    fontSize: 16, color: theme.colors.black,
  },
  modalWrap: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    width: Dimensions.get('window').width - 120,
    alignSelf: 'center',
  },
});
