import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';

export default function OnBoard({navigation}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/foodbg.jpeg')}>
      <LinearGradient colors={['transparent', 'white']} style={styles.overlay}>
        <Text style={styles.title2}>Live, love, eat.</Text>
        <Text style={styles.title}>
          Good food never fail in bringing people together.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Let's Start</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    flex: 1,
  },
  overlay: {
    marginTop: SIZES.height * 0.4,
    // backgroundColor: 'rgba(255,0,0,0.5)',
    height: SIZES.height * 0.6,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 100,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 16.0,
    elevation: 24,
  },
  btnText: {
    color: COLORS.white,
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  title2: {
    marginTop: SIZES.height * 0.3,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
