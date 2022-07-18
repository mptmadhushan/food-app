/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import {images, SIZES, COLORS, FONTS} from '../helpers';
import APIKit from '../helpers/apiKit';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({navigation}) => {
  useEffect(() => {});

  const [email, setEmail] = useState('');
  const [userPasswor, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeData = async value => {
    console.log(value);

    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      navigation.navigate('Home');
    } catch (e) {
      // saving error
    }
  };
  const onPressLogin = () => {
    const username = email;
    const password = userPasswor;

    const payload = {password, username};
    console.log('send data', payload);
    if (!username) {
      Toast.showWithGravity('Please enter username', Toast.LONG, Toast.TOP);
    }
    if (!password) {
      Toast.showWithGravity('Please enter password', Toast.LONG, Toast.TOP);
    } else {
      const onSuccess = ({data}) => {
        console.log('logged in', data);

        setLoading(false);
        storeData(data);
      };

      const onFailure = error => {
        if (error.response) {
          console.log(error.response.data);
          Toast.showWithGravity(
            error.response.data.message,
            Toast.LONG,
            Toast.TOP,
          );

          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
        // this.setState({errors: error.response.data, isLoading: false});
      };

      // Show spinner when call is made
      setLoading(true);

      APIKit.post('/auth/jwt/create', payload).then(onSuccess).catch(onFailure);
    }
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/food3.jpg')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          width: SIZES.width,
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.centerFlex}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: SIZES.width * 0.3,
                height: SIZES.width * 0.3,
                marginBottom: SIZES.height * 0.1,
              }}
            />
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.SectionStyle}>
              <TextInput
                label={'user name'}
                keyboardType="email-address"
                style={[isValid ? styles.inputStyleError : styles.inputStyle]}
                placeholder="User Name"
                placeholderTextColor={COLORS.white}
                onChangeText={text => {
                  setError;
                  setEmail(text);
                }}
                error={isValid}
              />
            </View>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.SectionStyle}>
              <TextInput
                label={'Password'}
                secureTextEntry
                style={[
                  styles.inputStyle,
                  isValid ? styles.inputStyleError : '',
                ]}
                placeholder="Password"
                placeholderTextColor={COLORS.white}
                error={isValid}
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>

          <View style={styles.centerFlex}>
            <View style={styles.centerFlex}>
              <TouchableOpacity
                // style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Register')}>
                {error ? (
                  <Text style={styles.errorTextStyle}>{error}</Text>
                ) : (
                  <Text style={styles.buttonTextStyle2}>
                    don't have an account? register here.
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onPressLogin()}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#43EA82', '#158A79']}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>LogIn</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* <Button
              title="Google Sign-In"
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
            /> */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTextStyle2: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
  rowFlex: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    // backgroundColor: '#FAFAFA',
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SectionStyle: {
    // backgroundColor: COLORS.secondary,
    // borderColor: COLORS.white,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    marginTop: 50,
    color: COLORS.white,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    color: COLORS.primary,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: COLORS.white,
    width: SIZES.width * 0.7,
  },
  inputStyleError: {
    flex: 1,
    color: COLORS.third,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  registerTextStyle: {
    color: '#4c5a5b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.05,
  },
});
