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

            AsyncStorage.getItem('saved').then((value) => {
              let savedEvents = JSON.parse(value)
              for (i in savedEvents) {
                let appears = false
                for (j in events) {
                  if (savedEvents[i].name === events[j].name) {
                    appears = true
                  }
                }
                if (appears === false) {
                  savedEvents.splice(i, 1)
                }
              }
              this.setState({savedEvents})
            })

            AsyncStorage.getItem('myEvents').then((value) => {
              let myEvents = JSON.parse(value)
              for (i in myEvents) {
                for (j in events) {
                  if (myEvents[i].saved !== events[j].saved && myEvents[i].name === events[j].name) {
                    myEvents[i].saved = events[j].saved
                  }
                }
              }
              AsyncStorage.setItem('myEvents', JSON.stringify(myEvents))
              this.setState({myEvents}), () => {
                this.forceUpdate()
              }
            })
          })
          .catch(err => {
            console.log(err)
        })
      }
    )
  }

  getSavedEvents() {
    if (this.state.savedEvents === null) {
      return []
    } else {
      return this.state.savedEvents
    }
  }

  getMyEvents() {
    if (this.state.myEvents === null) {
      return []
    } else {
      return this.state.myEvents
    }
  }

  getPastEvents() {
    if (this.state.pastEvents === null) {
      return []
    } else {
      return this.state.pastEvents
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.headings}>saved events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.getSavedEvents().sort(function(a, b) {  
            return Date.parse(b.start_time) - Date.parse(a.start_time)
          })}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>created events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.getMyEvents().sort(function(a, b) {
            return Date.parse(b.start_time) - Date.parse(a.start_time)
          })}></EventItem>
      <View style={{height: 20}}/>
      <Text style={styles.headings}>past events</Text>
      <View style={styles.divider}/>
      <EventItem events={this.getPastEvents().sort(function(a, b) {
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
    fontSize: 30,
    textAlign:'center',
    color: '#4E2A84',
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

