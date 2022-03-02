import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import APIKit, {setClientToken} from '../helpers/apiKit';
import DatePicker from 'react-native-date-picker';

export default function Chat() {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [userMenu, setMenu] = useState(false);
  const [userTable, setTable] = useState(false);
  const [botMessage, setBotMessage] = useState('');

  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState();
  const [open, setOpen] = useState(false);

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
  const onPressSend = () => {
    const pattern = message;

    const payload = {pattern};
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      setMessage('');
      console.log('response da💁', data);
      setBotMessage(data);
      if (
        data.tag === 'breakfast_menu' ||
        data.tag === 'lunch_menu' ||
        data.tag === 'dinner_menu' ||
        data.tag === 'fast_food_menu'
      ) {
        setMenu(true);
      }
      if (data.tag === 'table_reservation') {
        setTable(true);
      }
    };

    const onFailure = error => {
      setMessage('');
      if (error.response) {
        console.log(error);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.TOP,
        );

        console.log(error.response.status);
        console.log(error.response.headers);
      }
      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    // setLoading(true);

    APIKit.post('/bot/', payload).then(onSuccess).catch(onFailure);
  };
  const selectMenu = newData => {
    setMenu(false);
    const food_id = newData.id;
    const quantity = 2;
    const payload = {food_id, quantity};
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      console.log('response da💁', data);
      setBotMessage(data);
    };

    const onFailure = error => {
      if (error.response) {
        console.log(error);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.TOP,
        );

        console.log(error.response.status);
        console.log(error.response.headers);
      }
      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    // setLoading(true);

    APIKit.post('/order/', payload).then(onSuccess).catch(onFailure);
  };
  const makeReservation = newData => {
    setTable(false);
    const num_of_attendees = attendance;
    const check_in = 'Dec 15 2021  9:00PM';
    const check_out = 'Dec 15 2021  10:30PM';
    const payload = {num_of_attendees, check_in, check_out};
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      console.log('response da💁', data);
      setBotMessage(data);
    };

    const onFailure = error => {
      if (error.response) {
        console.log(error);
        Toast.showWithGravity(
          error.response.data.message,
          Toast.LONG,
          Toast.TOP,
        );

        console.log(error.response.status);
        console.log(error.response.headers);
      }
      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    // setLoading(true);

    APIKit.post('/table-reservation/', payload)
      .then(onSuccess)
      .catch(onFailure);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <View style={styles.chatWindow}>
          {/* <View style={styles.rowFlex}>
            <View style={styles.avatar}>
              <Icon name="logo-ionitron" size={25} color={COLORS.black} />
            </View>
            <View style={styles.bot}>
              <Text style={styles.text001}>How Can I help you?</Text>
            </View>
          </View> */}
          {message !== '' && (
            <View style={styles.rowFlexUser}>
              <View style={styles.userChat}>
                <Text style={styles.text002}>{message || ''}</Text>
              </View>
              <View style={styles.avatarUser}>
                <Icon
                  name="ios-person-circle-outline"
                  size={25}
                  color={COLORS.black}
                />
              </View>
            </View>
          )}
          {botMessage.response !== '' && (
            <View style={styles.rowFlex}>
              <View style={styles.avatar}>
                <Icon name="logo-ionitron" size={25} color={COLORS.black} />
              </View>
              <View style={styles.bot}>
                <Text style={styles.text001}>
                  {botMessage.response || 'Hi..'}
                </Text>
              </View>
            </View>
          )}
          {userMenu && (
            <View style={styles.rowFlexMenu}>
              {botMessage.data?.map((newData, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    width: SIZES.width * 0.2,
                    height: SIZES.width * 0.3,
                  }}>
                  <TouchableOpacity
                    onPress={() => selectMenu(newData)}
                    key={index}
                    style={styles.menuBtn}>
                    <Text style={styles.text001}>{newData.name}</Text>
                    <Text style={styles.text001}>Price: {newData.price}</Text>
                    <Text style={styles.text001}>
                      Discount: {newData.discount}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          {userTable && (
            <View>
              <View style={styles.rowFlexMenu}>
                <View>
                  <Button title="Check-In" onPress={() => setOpen(true)} />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
                <View>
                  <TextInput
                    style={[styles.inputStyle2]}
                    onChangeText={text => setAttendance(text)}
                    placeholder="Enter Attendance.." //12345
                    placeholderTextColor={COLORS.white}
                    keyboardType="numeric"
                    blurOnSubmit={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Button title="Check-Out" onPress={() => setOpen(true)} />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>
              <View>
                <Button title="Reserve" onPress={() => makeReservation()} />
              </View>
            </View>
          )}
        </View>
        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle]}
              onChangeText={text => setMessage(text)}
              placeholder="Enter text.." //12345
              value={message}
              placeholderTextColor={COLORS.white}
              keyboardType="default"
              blurOnSubmit={false}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          <TouchableOpacity onPress={() => onPressSend()} style={styles.slide1}>
            <View style={styles.rowFlex}>
              <Text style={styles.text001}>send</Text>
              <Icon name="ios-send" size={10} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.white,
    padding: 1,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: SIZES.width * 0.05,
  },
  bot: {
    // height: '100%',
    // width: SIZES.width * 0.8,
    padding: 5,
    marginLeft: SIZES.width * 0.005,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.primary,
  },
  avatarUser: {
    backgroundColor: COLORS.white,
    padding: 1,
    borderRadius: 50,
    marginRight: 10,
    // marginLeft: SIZES.width * 0.05,
  },
  userChat: {
    // height: '100%',
    // width: SIZES.width * 0.8,
    padding: 5,
    // marginLeft: SIZES.width * 0.005,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.white,
  },
  chatWindow: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  SectionStyle: {
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
    height: 40,
    margin: 5,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.white,
    paddingLeft: 15,
    // paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  inputStyle2: {
    color: COLORS.white,
    paddingLeft: 15,
    width: SIZES.width * 0.4,
  },
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  overlay: {
    marginTop: -SIZES.height * 0.2,
    height: SIZES.height * 0.7,
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlexMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlexUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  text001: {
    color: COLORS.white,
    marginRight: 16,
    fontSize: 15,
  },
  text002: {
    color: COLORS.black,
    marginRight: 16,
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: COLORS.black,
  },
  slide1: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    flex: 1,
    maxWidth: SIZES.width * 0.3,
    height: 40,
  },
  menuBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,

    flex: 1,
    maxWidth: SIZES.width * 0.3,
    height: 40,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
