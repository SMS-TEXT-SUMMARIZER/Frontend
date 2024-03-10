import React, { useEffect, useState } from 'react';
import { AppRegistry, View, Text, FlatList, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import Header from './src/components/Header.js';
import { name as appName } from './app.json';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import SmsAndroid from 'react-native-get-sms-android';
import SMSItem from './src/components/SMSItem.js';
import DatePicker from './src/components/DatePicker.js';

import handlePostRequest from './src/api/postRequest.js';
import ResponseItem from './src/components/ResponseItem.js';



const URL = 'https://backend-enev.onrender.com/send-data';

const App = () => {
  const [smsList, setSmsList] = useState([]);
  const [inputNumber, setInputNumber] = useState('10');
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false)

  const handleInputChange = (number) => {
    setInputNumber(number);
  };



  const handleButtonPress = async () => {
    // Handle the button press action, e.g., submit the input or perform some operation
    console.log('Input Value:', inputNumber);
    if(isRequestSuccessful == true){
      setInputNumber((num)=>String(10))
      setIsRequestSuccessful(false)
    }
    else{
      const response = await handlePostRequest(URL, smsList)
      setSmsList(response)
      setIsRequestSuccessful(true)
    }
  };

  const runOnlyOnce = async () => {
    await requestSmsPermissions();
    await fetchSmsMessages();
  };

  const requestSmsPermissions = async () => {
    try {
      const readPermission = await request(PERMISSIONS.ANDROID.READ_SMS);
      const writePermission = await request(PERMISSIONS.ANDROID.WRITE_SMS);
      const sendPermission = await request(PERMISSIONS.ANDROID.SEND_SMS);

      if (
        readPermission === RESULTS.GRANTED &&
        writePermission === RESULTS.GRANTED &&
        sendPermission === RESULTS.GRANTED
      ) {
        // Permissions granted, proceed with your code logic
        console.log('SMS permissions granted');
      } else {
        // Permissions not granted, handle accordingly
        console.log('SMS permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting SMS permissions:', error);
    }
  };

  const fetchSmsMessages = async () => {
    const filter = {
      box: 'inbox',
      indexFrom: 0,
      maxCount: inputNumber,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('fail', fail);
      },
      (count, smsList) => {
        const parsedSmsList = JSON.parse(smsList);
        console.log('count', count);
        console.log('smsList', parsedSmsList);
        setSmsList(parsedSmsList);
        setIsRequestSuccessful(false)
      }
    );
  };

  useEffect(() => {
    runOnlyOnce();
  }, [inputNumber]);

  return (
    <View style={{backgroundColor:'#222831'}}>
      <Header />
      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Number of messages for summarizing SMS.</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of messages for summarizing SMS."
            keyboardType="numeric"
            onChangeText={handleInputChange}
            value={inputNumber}
          />
          <Button title={isRequestSuccessful?"Reset":"Summarize"} onPress={handleButtonPress} />
        </View>
        {isRequestSuccessful == true ?
          (
            <>
              <Text style={styles.heroText}>Summarized Messages</Text>
              <View style={styles.hr} />
              <FlatList
                data={smsList}
                keyExtractor={(item) => item._id}
                renderItem={ResponseItem}
                style={styles.flatList}
              />
            </>)
          :
          (
            <>
              <Text style={styles.heroText}>Messages to Summarize</Text>
              <View style={styles.hr} />
              <FlatList
                data={smsList}
                keyExtractor={(item) => item._id}
                renderItem={SMSItem}
                style={styles.flatList}
              />
            </>)}


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    color:'white'
  },
  text: {
    height: 40,
    fontSize: 17,
    color:'white'
  },
  flatList: {
    maxHeight: '65%',
    width: '100%',
    
  },
  heroText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 20,
    color:'white'
  }
});


AppRegistry.registerComponent(appName, () => App);
