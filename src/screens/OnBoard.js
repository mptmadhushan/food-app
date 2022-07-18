import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
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
        <View style={styles.centerFlex}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.3,
              height: SIZES.width * 0.3,
            }}
          />
        </View>

        <Text style={styles.title}>Welcome{'\n'}To</Text>
        <Text style={styles.titlec}>Perch.</Text>

        {/* <Text style={styles.title}>Perch.</Text> */}
        <View style={styles.centerFlex}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LogIn');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#43EA82', '#158A79']}
              style={styles.btn}>
              <Text style={styles.btnText}>Let's Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    marginTop: SIZES.height * 0.3,
    // backgroundColor: 'rgba(255,0,0,0.5)',
    height: SIZES.height * 0.7,
    // alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORS.black,
    height: 40,
    width: 100,
    borderRadius: 20,
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
    color: COLORS.white,
    fontSize: 50,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  titlec: {
    color: COLORS.primary,
    fontSize: 50,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title2: {
    marginTop: SIZES.height * 0.1,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
