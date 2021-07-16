import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Home(){
    return(
        <View style={styles.container}>
            <Text> I'm be happy </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  