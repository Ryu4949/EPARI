import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {AppStackParamList} from '../../../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppText from '../../AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TotalListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'TotalTitle'
>;

const TotalTitle: React.FC<TotalListScreenProps> = () => {
  const [titles, setTitles] = useState([]);
  const [token, setToken] = useState('');
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    // titleList();
    getData();
    // getCollection();
  }, []);
  useEffect(() => {
    getCollection();
  }, [token]);

  const getData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('GoogleAccessToken');
      if (storedToken !== null) {
        console.log('storedToken : ', storedToken);
        setToken(storedToken);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log('토큰', token);

  const getCollection = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    fetch('http://j7a201.p.ssafy.io/epari/v1/collection/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('내꺼', result);
        const collected = 0;
        result.map(item => {
          if (item.isCollected === true) {
            console.log('모은 거', item);
            collected += 1;

            if (collected === 1) {
              const obtained = new FormData();
              obtained.append('titleId', 1);

              const requestPost = {
                method: 'POST',
                body: obtained,
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: token,
                },
              };
              fetch('http://j7a201.p.ssafy.io/epari/v1/titles/', requestPost)
                .then(response => {
                  response.text();
                })
                .then(result => {
                  console.log('1111111111', result);
                  console.log(obtained);
                });
            }

            return;
          }
        });

        console.log('토큰zzzzz', token);
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
        fetch('http://j7a201.p.ssafy.io/epari/v1/titles', requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(0, result);
            // let tmpTitleArray = [];
            // result.map(item => {
            //   tmpTitleArray.push(item);
            // });
            // console.log(1, tmpTitleArray);
            const resultSet = new Set(result);
            const newResult = [...resultSet];
            console.log('newResult', newResult);
            setTitles(newResult);
            console.log(2, titles);
          });
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable>
          <View>
            <AppText
              style={styles.button}
              onPress={() => {
                titleList();
              }}>
              칭호 불러오기
            </AppText>
          </View>
        </Pressable>
        {titles.length ? (
          titles.map(title => (
            <View key={title.titleId.titleId} style={styles.Item}>
              <Image
                source={{uri: title.titleId.titlePictureUrl}}
                style={styles.ImageItem}
              />
              <View style={styles.Text}>
                <AppText style={styles.TitleItem}>
                  {title.titleId.titleName}
                </AppText>
                <AppText style={styles.TextItem}>
                  {title.titleId.titleDescription}
                </AppText>
              </View>
              <Pressable>
                <View>
                  <AppText
                    style={styles.button}
                    onPress={() => {
                      // saveImage();
                    }}>
                    등록하기
                  </AppText>
                </View>
              </Pressable>
            </View>
          ))
        ) : (
          <AppText>아직 획득한 칭호가 없습니다.</AppText>
        )}
      </View>
    </View>
  );
};

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
  },
  Item: {
    height: ScreenWidth * 0.23,
    width: ScreenWidth * 0.95,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ScreenHeight * 0.015,
    marginHorizontal: ScreenWidth * 0.025,
    borderRadius: 12,
    borderWidth: 2.4,
    backgroundColor: '#CFDE8B',
  },
  ImageItem: {
    width: ScreenWidth * 0.16,
    height: ScreenWidth * 0.16,
    borderRadius: 12,
    borderWidth: 2.4,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
    marginLeft: ScreenWidth * 0.025,
  },
  Text: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: ScreenWidth * 0.025,
    justifyContent: 'center',
  },
  TitleItem: {
    fontSize: 18,
    marginBottom: ScreenHeight * 0.005,
  },
  TextItem: {
    width: ScreenWidth * 0.5,
  },
  button: {
    padding: ScreenWidth * 0.02,
    backgroundColor: '#00845E',
    borderRadius: 10,
    borderWidth: 2,
    textAlign: 'center',
  },
});

export default TotalTitle;
