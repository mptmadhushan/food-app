/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import APIKit, {setClientToken} from '../helpers/apiKit';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import OpenApplication from 'react-native-open-application';

const SquareView = color => {
  return (
    <View
      style={{
        height: 200,
        width: 200,
        backgroundColor: color,
      }}
    />
  );
};

export default function Chat() {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [userMenu, setMenu] = useState(false);
  const [orderCustomize, setOrderCustomize] = useState(false);
  const [userTable, setTable] = useState(false);
  const [customizeHistory, setCustomizeHistory] = useState(false);
  const [botMessage, setBotMessage] = useState('');
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [attendance, setAttendance] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const packageName = JSON.parse(jsonValue);
      console.log('token ❓', packageName.refresh);
      setUser(packageName);
      setClientToken(packageName.access);
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
      if (data.tag === 'order_customization' || data.tag === 'order') {
        setOrderCustomize(true);
      }
      // if (data.tag !== 'order' || data.tag !== 'order_customization') {
      //   setOrderCustomize(false);
      // }
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
  const orderCustSelect = newData => {
    console.log('🚀 ~ newData', newData.id);
    const onSuccess = ({data}) => {
      console.log('success 🏀🏀');
      console.log('response da💁', data);
      setBotMessage(data);
      if (data.tag === 'customization_history') {
        setCustomizeHistory(true);
      }
    };

    const onFailure = error => {
      console.log('fail 🏀🏀', error);

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
    };

    APIKit.get(`/order-customization/${newData.id}/`)
      .then(onSuccess)
      .catch(onFailure);
    console.log('order');
    setBotMessage('Please Select type');
  };
  const orderCust = (newData, botMessage) => {
    console.log(
      'send data',
      botMessage.data.ordered_customized_foods[0].customization.food,
    );
    const food_id =
      botMessage.data.ordered_customized_foods[0].customization.food;
    const customization = newData;
    const payload = {
      customization: customization,
    };
    console.log('send data', payload);

    const onSuccess = () => {
      setCustomizeHistory(false);
      console.log('success 🏀🏀');
      const data = {response: 'order customized!'};
      console.log('response da💁', data);
      setBotMessage(data);
    };

    const onFailure = error => {
      console.log('fail 🏀🏀', error);

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
    // if (botMessage.tag === 'order_customization') {
    APIKit.post(`/order-customization/${food_id}/`, payload)
      .then(onSuccess)
      .catch(onFailure);
    // } else {
    //   console.log('order');
    //   setBotMessage('');
    // }
  };
  const makeReservation = newData => {
    setTable(false);
    const num_of_attendees = parseInt(attendance);
    const check_in = moment(date1).format('MMM DD YYYY hh:mma');
    const check_out = moment(date2).format('MMM DD YYYY hh:mma');
    const payload = {num_of_attendees, check_in, check_out};
    console.log('send data', payload);
    console.log(moment(check_in).format('DD MMM YYYY, hh:mm a'));
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
          {message !== '' && orderCustomize && (
            <View style={styles.rowFlexUser}>
              <View style={styles.userChat}>
                <Text style={styles.text002}>
                  {botMessage.data?.order_type || ''}
                </Text>
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
                {botMessage.tag ==='reservation_status'&& <Text style={styles.text001}>
                check in  {moment(botMessage.data.check_in).format('MMM DD YYYY hh:mm a') || 'Hi..'}
                </Text>}
                {botMessage.tag ==='reservation_status'&& <Text style={styles.text001}>
                 check out {moment(botMessage.data.check_out).format('MMM DD YYYY hh:mm a')  || 'Hi..'}
                </Text>}
                {botMessage.tag ==='reservation_status'&& <Text style={styles.text001}>
                table {botMessage.data.table || 'Hi..'}
                </Text>}
              </View>
            </View>
          )}
          {customizeHistory && (
            <View style={styles.rowFlex}>
              <View style={styles.avatar}>
                <Icon name="logo-ionitron" size={25} color={COLORS.black} />
              </View>
              <View style={styles.bot}>
                <Text style={styles.text001}>{botMessage.data.response}</Text>
                <ScrollView horizontal={true}>
                  {botMessage.data?.possible_customizations?.map(
                    (newData, index) => (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                          // width: SIZES.width * 0.3,
                          // height: SIZES.height * 0.5,
                        }}>
                        <TouchableOpacity
                          onPress={() => orderCust(newData, botMessage)}
                          key={index}
                          style={styles.menuBtn}>
                          <Text style={styles.text001}>{newData}</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                  )}
                </ScrollView>
              </View>
            </View>
          )}
          {botMessage.response === "Here's your order details" && (
            <View style={styles.rowFlex}>
              <View style={styles.avatar}>
                <Icon name="logo-ionitron" size={25} color={COLORS.black} />
              </View>
              <View style={styles.bot}>
                <Text style={styles.text001}>
                  {botMessage.data?.order_type}
                </Text>
              </View>
            </View>
          )}
          {userMenu && (
            <ScrollView
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={SIZES.width * 0.8 + 25}
              snapToAlignment="center"
              contentInset={{
                top: 0,
                left: 20,
                bottom: 0,
                right: 20,
              }}>
              {botMessage.data?.map((newData, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    // width: SIZES.width * 0.2,
                    // height: SIZES.width * 0.3,
                  }}>
                  <TouchableOpacity
                    onPress={() => selectMenu(newData)}
                    key={index}
                    style={styles.menuBtn}>
                    <Image
                      source={{
                        uri: newData.image,
                      }}
                      resizeMode="contain"
                      style={{
                        width: SIZES.width * 0.3,
                        height: SIZES.width * 0.3,
                      }}
                    />
                    <Text style={styles.text001}>{newData.name}</Text>
                    <Text style={styles.text001}>Price: {newData.price}</Text>
                    <Text style={styles.text001}>
                      Discount: {newData.discount}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          {orderCustomize && (
            <ScrollView horizontal={true}>
              {botMessage.data?.ordered_food?.map((newData, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    // width: SIZES.width * 0.3,
                    // height: SIZES.height * 0.5,
                  }}>
                  <TouchableOpacity
                    onPress={() => orderCustSelect(newData)}
                    disabled={
                      botMessage.data.response === "Here's your order details'"
                    }
                    key={index}
                    style={styles.menuBtn}>
                    <Image
                      source={{
                        uri: newData.image,
                      }}
                      resizeMode="contain"
                      style={{
                        width: SIZES.width * 0.3,
                        height: SIZES.height * 0.3,
                      }}
                    />

                    <Text style={styles.text001}>{newData.name}</Text>
                    <Text style={styles.text001}>Price: {newData.price}</Text>
                    <Text style={styles.text001}>
                      Discount: {newData.discount}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          {userTable && (
            <View>
              <View style={styles.rowFlexMenu}>
                <View>
                  <Button title="Check-In" onPress={() => setOpen1(true)} />
                  <DatePicker
                    modal
                    open={open1}
                    date={date1}
                    onConfirm={date1 => {
                      setOpen1(false);
                      setDate1(date1);
                    }}
                    onCancel={() => {
                      setOpen1(false);
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
                  <Button title="Check-Out" onPress={() => setOpen2(true)} />
                  <DatePicker
                    modal
                    open={open2}
                    date={date2}
                    onConfirm={date2 => {
                      setOpen2(false);
                      setDate2(date2);
                    }}
                    onCancel={() => {
                      setOpen2(false);
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
    flexWrap: 'wrap',
    display: 'flex',
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
    padding: 3,
    margin: 2,
    // flex: 1,
    maxWidth: SIZES.width * 0.4,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
