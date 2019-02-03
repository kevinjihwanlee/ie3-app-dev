import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../components/EventItem';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#4E2A84', // northwestern purple
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
          size={110}
          style={styles.profileIcon}/>
          <View style={{flexDirection:"column"}}>
            <Text style={styles.userName}>willie wildcat</Text>
            <Text style={styles.userDate}>joined: october 18th, 2018</Text>
          </View>
        </View>
      <Text style={styles.headings}>starred events</Text>
      <View style={styles.divider}/>
      <EventItem></EventItem>
      <Text style={styles.headings}>past events</Text>
      <View style={styles.divider}/>
      <EventItem></EventItem>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection:"row",
    backgroundColor: '#dec9ff',
    marginBottom: 20,
    height: 130,
  },
  greyBar: {
    flexDirection:"row",
    backgroundColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 120,
    borderRadius: 25,
  },
  userDate: {
    paddingLeft: 25,
    fontSize: 18,
    fontStyle: 'italic',
    paddingRight: 30,
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingTop: 35,
    paddingLeft: 15,
    paddingRight: 30,
    flexWrap: 'wrap',
  },
  headings: {
    fontSize: 50,
    paddingLeft: 30,
    color: '#c1c1c1',
  },
  divider: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profileIcon: {
    marginTop: 10,
    marginLeft: 30,
  }
});

