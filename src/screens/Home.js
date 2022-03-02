/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({navigation, route}) {
  // const response = route.params.response;
  // const email = response?.user.email;
  // const name = email.split('@')[0];
  const [user, setUser] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const packageName = JSON.parse(jsonValue);
      console.log('token ❓', packageName.refresh);
      setUser(packageName);
    } catch (e) {
      console.log('ee', e);
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/food2.jpeg')}>
      <LinearGradient
        colors={['transparent', COLORS.black, COLORS.black]}
        style={styles.overlay}>
        <View
          style={{
            marginTop: SIZES.height * 0.3,
          }}>
          <Text style={styles.title2}>Hello Fred!</Text>
          <Text style={styles.title21}>What's new today?</Text>
        </View>

        {/* <View style={styles.rowNorm}> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Instruction')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Icon
              name="ios-information-circle-outline"
              size={50}
              color={COLORS.white}
            />
            <Text style={styles.text001}>Instructions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Icon name="chatbubbles-outline" size={50} color={COLORS.white} />
            <Text style={styles.text001}>Chat Bot</Text>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.black},
  slide1: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    maxWidth: SIZES.width * 0.7,
    height: SIZES.width * 0.25,
    marginLeft: SIZES.width * 0.15,
    marginRight: SIZES.width * 0.15,
    marginTop: SIZES.height * 0.02,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title2: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.width * 0.06,
    fontSize: 25,
    textAlign: 'center',
  },
  title21: {
    color: COLORS.white,
    marginLeft: SIZES.width * 0.06,
    fontSize: 20,
    textAlign: 'center',
  },
  text001: {
    color: COLORS.white,
    fontSize: 15,
  },
  overlay: {
    marginTop: SIZES.height * 0.2,
    height: SIZES.height * 0.8,
    // alignItems: 'center',
  },
  title1: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: SIZES.width * 0.06,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: SIZES.width,
    marginTop: SIZES.height * 0.01,
    marginLeft: SIZES.width * 0.06,
    marginRight: SIZES.width * 0.06,
  },
});
