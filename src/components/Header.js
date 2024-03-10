import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Header = () => {
  const { textStyling, viewStyle, imageStyle } = styles;

  return (
    <View style={viewStyle}>
      <Image
        source={require('../assets/nav-logo.png')}
        style={imageStyle}
        resizeMode="contain" // Adjust the resizeMode based on your image's aspect ratio
      />
    </View>
  );
};

const styles = StyleSheet.create({

  viewStyle: {
    backgroundColor: '#090b17',
    height: 70,
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  imageStyle: {
    width: '100%', // Adjust the width based on your image's size
    height: 55, // Adjust the height based on your image's size

  },
});

export default Header;
