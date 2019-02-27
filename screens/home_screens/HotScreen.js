import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../../components/EventItem';
import axios from 'axios';

export default class HotScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events:[ ]
    }
  }
  componentDidMount(){
      
      axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
        .then(res => {
            this.setState({
            events: res.data.data,
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    render() {
      const { events } = this.state;
      //The number of times that the event is saved to count as a hotevent
      const defineHot = 0
      console.log(events)
      var hot_events = []
      for (var i = 0;i < events.length; i++){
        a = events[i]
        if (a.saved >= defineHot){
          hot_events.push({
          id: a._id,
          name: a.name,
          author: a.author,
          description: a.description,
          date_created: a.date_created,
          date_event: '',
          start_time: a.start_time,
          end_time: a.end_time,
          location: a.location,
          saved: a.saved,
          latitude: a.coordinate.latitude,
          longitude: a.coordinate.longitude,
        })
      }
    
    }
    
      return (
          <ScrollView style={styles.container}>
              <Text style={styles.headings}>hot events</Text>
              <View style={styles.divider}/>
              <EventItem events={hot_events}></EventItem>
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
  greyBar: {
    flexDirection:"row",
    backgroundColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 120,
    borderRadius: 25,
  },
  headings: {
    fontSize: 50,
    paddingLeft: 30,
    color: '#c1c1c1',
  },
  divider: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
  }
});




