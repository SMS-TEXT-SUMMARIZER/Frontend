import { StyleSheet, Text, View } from "react-native";


const ResponseItem = ({ item }) => {
  if (item.body == '') {
    return (
      <View style={styles.smsItemContainer}>
        <Text style={styles.errorSender}>{item.number}</Text>
        <Text style={styles.errorMessageBody}>Message is too small to Summarize</Text>
      </View>
    )
  }
  else if (item.error == true) {
    return (
      <View style={styles.smsItemContainer}>
        <Text style={styles.errorSender}>{item.number}</Text>
        <Text style={styles.errorMessageBody}>Some error has occured while Summarizing this Message</Text>
      </View>
    )
  }
  return (
    <View style={styles.smsItemContainer}>
      <Text style={styles.sender}>{item.number}</Text>
      <Text style={styles.messageBody}>{item.body}</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  smsItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 8,
    color:'white'
  },
  messageBody: {
    fontSize: 16,
    color:'white'
  },
  errorSender: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'red'
  },
  errorMessageBody: {
    fontSize: 16,
    color: 'red'
  }
});

export default ResponseItem