import { StyleSheet, Text, View } from "react-native";


const SMSItem = ({ item }) => (
    <View style={styles.smsItemContainer}>
      <Text style={styles.sender}>{item.address}</Text>
      <Text style={styles.messageBody}>{item.body}</Text>
    </View>
  );


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
  });

  export default SMSItem