import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../components/EventItem';
import axios from 'axios';

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved',
    headerStyle: {
      backgroundColor: '#4E2A84', // northwestern purple
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      savedEvents: [],
      myEvents: [],
      pastEvents: [],
    }
    
    this.props.navigation.addListener('willFocus', 
      payload => {
        try {
          AsyncStorage.getItem('saved').then((value) => {
            let savedEvents = JSON.parse(value)
            this.setState({savedEvents})
          })
        } catch (error) {
          console.log(error.message)
        }
    
        try {
          AsyncStorage.getItem('myEvents').then((value) => {
            this.setState({myEvents: JSON.parse(value)}), () => {
              this.forceUpdate()
            }
          })
        } catch (error) {
          console.log(error.message)
        }

        axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
          .then(res => {
            const events = res.data.data
            let pastEvents = []
            const now = new Date()
            for (event of events) {
              if (Date.parse(event.end_time) < now) {
                pastEvents.push(event)
              }
            }
            this.setState({pastEvents}), () => {
              this.forceUpdate()
            }
          })
          .catch(err => {
            console.log(err)
        })
      }
    )
  }

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
      <Text style={styles.headings}>saved events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.state.savedEvents.sort(function(a, b) {
            return Date.parse(b.start_time) - Date.parse(a.start_time)
          })}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>created events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.state.myEvents.sort(function(a, b) {
            return Date.parse(b.start_time) - Date.parse(a.start_time)
          })}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>past events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.state.pastEvents.sort(function(a, b) {
            return Date.parse(b.start_time) - Date.parse(a.start_time)
          })}></EventItem>
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
    color: '#a9a9a9',
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

