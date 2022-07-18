/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(false);
  const __doSignUp = () => {
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;
    const __isValidEmail = emailRegex.test(email);
    if (!email) {
      setError('Email required *');
      setValid(true);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(true);
      return;
    } else if (!__isValidEmail) {
      setError('Invalid Email');
      setValid(true);
      return;
    }
    __doCreateUser(email, password);
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        setValid(false);
        setError();

        Alert.alert('Success', 'Account created successfully.. please login');
        navigation.navigate('LogIn');
      }
    } catch (e) {
      console.error(e.message);
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
              source={images.logo1}
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
                label={'Email'}
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
                onPress={() => navigation.navigate('LogIn')}>
                {error ? (
                  <Text style={styles.errorTextStyle}>{error}</Text>
                ) : (
                  <Text style={styles.buttonTextStyle2}>
                    have an account? login here.
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.5} onPress={() => __doSignUp()}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#43EA82', '#158A79']}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;

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
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
});
