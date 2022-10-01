import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
  education?: '고등학교' | '전문대' | '대학교' | '석사' | '박사' | '기타',
  gender: '남성' | '여성',
  height: string,
  id: number,
  introduction: string,
  job: string,
  location: string,
  name: string,
  school?: string,
  pictures: string[],
}

interface ProfileDataType {
  data: ProfileType,
  meta: {
    body_types: Array<{
      key: string,
      name: '마른' | '보통' | '근육' | '통통'
    }>,
    educations: Array<{
      key: string,
      name: '고등학교' | '전문대' | '대학교' | '석사' | '박사' | '기타'
    }>,
    genders: Array<{
      key: string,
      name: '남성' | '여성'
    }>,
    height_range: { max: number, min: number }
  }
}


const Mypage = () => {
  const [heightArr, setHeightArr] = useState<string[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{
    headerTitle: string,
    children: JSX.Element,
    viewStyle?: ViewStyle
  }>();
  const [profileInfo, setProfileInfo] = useState<ProfileType>({
    introduction: '',
    height: '',
    birthday: '',
    company: '',
    body_type: '근육',
    education: '고등학교',
    gender: '남성',
    id: 0,
    job: '',
    location: '',
    name: '',
    pictures: [],
  });
  const scrollRef = useRef<ScrollView>(null);

  const { data: profile } = useQuery<ProfileDataType, Error>('getProfile', getProfile);


  useEffect(() => {
    // * 키 범위 만드는 핸들러
    if (profile?.meta.height_range) {
      let height = profile?.meta.height_range.min;
      const arr: string[] = [];
      while (height < profile?.meta.height_range.max + 1) {
        if (height === profile?.meta.height_range.min) {
          arr.push(height.toString() + 'cm 이하');
        }
        else if (height === profile?.meta.height_range.max) {
          arr.push(height.toString() + 'cm 이상');
        }
        else {
          arr.push(height.toString() + 'cm');
        }
        height++;
      }
      setHeightArr(arr);
    }
  }, [profile?.meta.height_range]);

  useEffect(() => {
    // * 초기값 담기
    if (profile) {
      setProfileInfo({
        ...profile.data,
        height: `${profile.data.height}cm`,
      });
    }
  }, [profile]);

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
              {React.Children.toArray(
                profile?.meta.genders.map(v => {
                  if (v.key === profileInfo.gender) {
                    return v.name;
                  }
                })
              )}
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
                          }}
                            onLayout={(event) => {
                              if (profileInfo.height === heightValue) {
                                const layout = event.nativeEvent.layout;
                                scrollRef.current?.scrollTo({ x: 0, y: layout.y, animated: false });
                              }
                            }}
                          >
                            <Text style={[FONT.Regular, {
                              color: profileInfo.height === heightValue ? theme.colors.glamBlue : theme.colors.black,
                              marginBottom: index === heightArr.length - 1 ? 0 : 20,
                            }]}>
                              {heightValue}
                            </Text>
                          </TouchableOpacity>
                        );
                      }))}
                    </>
                  ),
                  viewStyle: { height: 500 },
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

            <Pressable onPress={() => {
              setModalOpen(true);
              setModalInfo({
                children: (
                  <>
                    {React.Children.toArray(profile?.meta.body_types.map((body, index) => (
                      <TouchableOpacity onPress={() => {
                        setProfileInfo({ ...profileInfo, body_type: body.key });
                        setModalOpen(false);
                      }}>
                        <Text style={[FONT.Regular, {
                          color: profileInfo.body_type === body.key ? theme.colors.glamBlue : theme.colors.black,
                          marginBottom: index === profile?.meta.body_types.length - 1 ? 0 : 20,
                        }]}>
                          {body.name}
                        </Text>
                      </TouchableOpacity>
                    )))}
                  </>
                ),
                headerTitle: '체형',
              });
            }} style={styles.infoCard}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                체형
              </Text>
              <Text style={[FONT.Regular, {
                color: theme.colors.glamBlue,
              }]}>
                {React.Children.toArray(
                  profile?.meta.body_types.map(v => {
                    if (v.key === profileInfo.body_type) {
                      return v.name;
                    }
                  })
                )}
              </Text>
            </Pressable>

          </View>

          <View style={{ paddingVertical: 8 }}>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                직장
              </Text>
              <TextInput
                value={profileInfo.company}
                style={[FONT.Regular, styles.profileInput]}
                placeholder="입력해주세요"
                placeholderTextColor={theme.colors.grayscale.gray2}
                onChangeText={(e) => setProfileInfo({ ...profileInfo, company: e })}
              />
            </View>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                직업
              </Text>
              <TextInput
                value={profileInfo.job}
                style={[FONT.Regular, styles.profileInput]}
                placeholder="입력해주세요"
                placeholderTextColor={theme.colors.grayscale.gray2}
                onChangeText={(e) => setProfileInfo({ ...profileInfo, job: e })}
              />
            </View>
            <Pressable
              onPress={() => {
                setModalOpen(true);
                setModalInfo({
                  children: (
                    <>
                      {React.Children.toArray(profile?.meta.educations.map((edu, index) => (
                        <TouchableOpacity onPress={() => {
                          setProfileInfo({ ...profileInfo, education: edu.name });
                          setModalOpen(false);
                        }}>
                          <Text style={[FONT.Regular, {
                            color: profileInfo.education === edu.name ? theme.colors.glamBlue : theme.colors.black,
                            marginBottom: index === profile.meta.educations.length - 1 ? 0 : 20,
                          }]}>
                            {edu.name}
                          </Text>
                        </TouchableOpacity>
                      )))}
                    </>
                  ),
                  headerTitle: '학력',
                });
              }}
              style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                학력
              </Text>
              {profileInfo.education ?
                <Text style={[FONT.Regular, { width: '65%', color: theme.colors.glamBlue }]}>
                  {profileInfo.education}
                </Text>
                :
                <Text style={[FONT.Regular, { color: theme.colors.grayscale.gray2 }]}>
                  선택해주세요
                </Text>
              }
            </Pressable>
            <View style={[styles.infoCard]}>
              <Text style={[FONT.Regular, styles.profileTitle, { width: '35%' }]}>
                학교
              </Text>
              <TextInput
                value={profileInfo.school}
                style={[FONT.Regular, { width: '65%', color: theme.colors.glamBlue }]}
                placeholder="입력해주세요"
                placeholderTextColor={theme.colors.grayscale.gray2}
                onChangeText={(e) => setProfileInfo({ ...profileInfo, school: e })}
              />
            </View>
          </View>
        </View>

        {/* 프로필 수정 팝업 */}
        {modalOpen &&
          <Modal
            isVisible={modalOpen}
            hideModalContentWhileAnimating={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => setModalOpen(false)}
            onBackButtonPress={() => setModalOpen(false)}
            backdropTransitionOutTiming={0}
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
              <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                style={modalInfo?.viewStyle}>
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
  profileInput: {
    color: theme.colors.glamBlue,
    width: '65%',
  },
  modalWrap: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    width: Dimensions.get('window').width - 120,
    alignSelf: 'center',
  },
});
