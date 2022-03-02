/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';

const AdminNearBy = () => {
  const data = [
    {
      id: 1,
      title: 'suger',
      desc: 'Qui est duis id do eu pariatur velit magna ipsum est sint ex mollit.Mollit in ex velit duis ipsum amet cillum velit consequat.',
      image:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      title: 'Ketogenic diet',
      desc: 'Consequat minim irure commodo laboris ea mollit quis cillum consequat dolor.',
      image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      title: 'Salad',
      desc: 'Laborum cupidatat commodo ex labore officia minim id veniam minim labore.Non culpa laboris tempor fugiat. s',
      image:
        'https://images.unsplash.com/photo-1562013841-2119f48ada80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    },
    {
      id: 4,
      title: 'suger',
      desc: 'Qui est duis id do eu pariatur velit magna ipsum est sint ex mollit.Mollit in ex velit duis ipsum amet cillum velit consequat.',
      image:
        'https://images.unsplash.com/photo-1515481774243-98fd57ff2bd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 5,
      title: 'suger 2',
      desc: 'Consequat minim irure commodo laboris ea mollit quis cillum consequat dolor.',
      image:
        'https://images.unsplash.com/photo-1619096118293-a34a2f9b7339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80',
    },
  ];
  return (
    <LinearGradient
      colors={[COLORS.black, COLORS.primary, COLORS.black]}
      style={styles.mainBody}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      locations={[0, 0.7, 0.9]}>
      <Text style={styles.title3}>Instructions</Text>
      <FlatList
        data={data}
        // renderItem={renderItem}
        renderItem={({item}) => (
          <LinearGradient
            colors={[COLORS.black, COLORS.primary, COLORS.black]}
            style={styles.item}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0, 0.2, 0.88]}>
            <Image
              source={{uri: item.image}}
              resizeMode="contain"
              style={{
                resizeMode: 'cover',
                borderRadius: 5,
                width: SIZES.width * 0.2,
                height: SIZES.width * 0.2,
              }}
            />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.title2}>{item.desc}</Text>
            </View>
          </LinearGradient>
        )}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderRadius: 5,
    backgroundColor: '#4792f1',
    padding: 20,
    flexDirection: 'row',
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 16,
    width: SIZES.width * 0.5,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    marginLeft: 16,
    width: SIZES.width * 0.5,
    color: COLORS.white,
    textAlign: 'center',
  },
  title3: {
    fontSize: 30,
    width: SIZES.width * 0.5,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
  mainBody: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AdminNearBy;
