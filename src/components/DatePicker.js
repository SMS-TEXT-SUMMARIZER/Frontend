import React, { useState } from 'react';
import { AppRegistry, View, Text, Button, StyleSheet, DatePickerAndroid } from 'react-native';
import { name as appName } from './app.json';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = async () => {
    console.log("####")
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });

      if (action === DatePickerAndroid.dateSetAction) {
        const selected = new Date(year, month, day);
        setSelectedDate(selected);
      } else if (action === DatePickerAndroid.dismissedAction) {
        console.log('DatePicker dismissed');
      }
    } catch (error) {
      console.error('Error opening DatePicker:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Date: {selectedDate ? selectedDate.toDateString() : 'No date selected'}</Text>
      <Button title="Pick a Date" onPress={showDatePicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DatePicker