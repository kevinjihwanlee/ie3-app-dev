import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../components/EventItem';

const starred_events = [
  {
    id: '1',
    name: 'Rachael\'s 21st Birthday!',
    author: 'rach',
    description: 'better than the party below because it has a really long description, so you can test what long descriptions do, in case that is interesting content to know about. We can make this section as long as we want with as much text as we want.',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '1:00am',
    location: '1024 Noyes Avenue, Evanston, IL 60201',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
    is_saved: true,
  },
  {
    id: '2',
    name: 'Norris Grand Opening',
    author: 'id123',
    description: 'Come celebrate the grand opening of Norris with free food!',
    date_created: Date.now(),
    date_event: 'Oct 8',
    start_time: '1:00pm',
    end_time: '4:00pm',
    location: "Norris Student Center at Northwestern University",
    saved: 2,
    latitude: 42.05336,
    longitude: -87.672662,
    is_saved: true,
  },
  {
    id: '3',
    name: 'a party',
    author: 'id321',
    description: 'party to end all parties at ridge and noyes, you cannot miss this spectacle. lots of good times and chips and dip. welcome to all! :)',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '3:00am',
    location: 'mikalya\'s place, 1514 Ridge Place',
    saved: 45,
    latitude: 42.05336,
    longitude: -87.672662,
    is_saved: true,
  }
];


const past_events = [
  {
    id: '4',
    name: 'Rachael\'s 20th Birthday!',
    author: 'rach',
    description: 'a past event that happened in the past it has a really long description you can test what long descriptions do, in case that is interesting content to know about. We can make this section as long as we want with as much text as we want.',
    date_created: Date.now(),
    date_event: 'Dec 30',
    start_time: '10:00pm',
    end_time: '1:00am',
    location: '1024 Noyes Avenue, Evanston, IL 60201',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  }
];

const created_events = [
  {
    id: '6',
    name: 'Shrek the Musical',
    author: 'rach',
    description: 'You know everyone\'s excited to see Shrek and the gang back at it again.',
    date_created: Date.now(),
    date_event: 'Sept 18',
    start_time: '6:00pm',
    end_time: '8:00pm',
    location: 'Cahn Auditorium',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  }
];


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
      <EventItem events={starred_events}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>created events</Text>
      <View style={styles.divider}/>
      <EventItem events={created_events}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>past events</Text>
      <View style={styles.divider}/>
      <EventItem events={past_events}></EventItem>
      <View style={{height: 50}}/>
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
  },
  profileIcon: {
    marginTop: 10,
    marginLeft: 30,
  }
});

