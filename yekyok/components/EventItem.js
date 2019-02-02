import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export class EventItem extends React.Component {
  render() {
    return <View style={styles.greyBar}></View>;
  }
}

const styles = StyleSheet.create({
  greyBar: {
    flexDirection:"row",
    backgroundColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 120,
    borderRadius: 25,
  }
});