## React Native 글램 과제

<div>
<img src="https://user-images.githubusercontent.com/73378472/193428809-527553a1-7a6a-4ee8-bb96-8b4e06915e04.gif" width="200">
<img src="https://user-images.githubusercontent.com/73378472/193428694-7bda0834-540b-469a-8b44-42baf1128e53.gif" width="200">
</div>

## 구현 기술
### 홈
- 페이지 진입시 오늘의 추천 api와, 추가 추천 api react-query, axios 사용해서 동시 호출
- 호출 완료시 오늘의 추천 - 맞춤 추천 - 추가 추천 순으로 노출
- 카드 정보에 소개가 있을 경우 기본정보 하단에 노출 없을 경우 기본정보 하단에 작업, 거리, 키 노출
- 오늘의 추천 api로 가져온 항목은 오늘의 추천 태그 노출
- 리스트 하단 도달시 추가 추천 api추가
- 맞춤 추천 선택 클릭시 추천 api 최상단 노출
- x, 좋아요 버튼 클릭시 목록에서 삭제
- 상단 네비 오른쪽 아이콘 클릭시 프로필로 이동
### 프로필
- 페이지 진입시 프로필 api호출하여 정보 노출
- 사진, 닉네임, 성별, 생일, 위치 제외 모든 항목 수정 기능
- 키, 체형, 학력 클릭시 팝업으로 수정 기능 



## 사용 기술스택
- react-native
- typescript
- react-query

## 사용 모듈
| 모듈명                  |   사용 이유                                                                                                        |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------- |
| react-navigation      |   stack, bottom tab 화면 구성을 위해서 사용
| react-native-linear-gradient |   추천카드에 그라디언트색 적용하기 위해서 사용
| react-native-modal            |      프로필 수정시 팝업 띄우기 위해서 사용                                                                                   |
| react-native-tab-view                |    상단 탭뷰를 쉽게 사용하기 위해서 사용                                                                                   |
| react-native-iphone-x-helper        |    iphone ui를 쉽게 디자인하기 위해서 사용 
| react-native-fast-image  | 이미지 최적화를 위해서 사용
