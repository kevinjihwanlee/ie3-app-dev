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
      const self = this
      axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
        .then(res => {
          console.log(res.data)
        })
        .then(res => {
          self.setState({
            events:res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
       console.log(this.state)
    }

  

    render() {
      const { events } = this.state;
      const hot_events = 
        events.map(post => {
          return(
            { 
            id: post._id,
            name: post.name,
            author: post.author,
            description: '',
            date_created: post.date_created,
            date_event: '',
            start_time: '',
            end_time: post.end_time,
            location: post.location,
            saved: 2,
            latitude: post.coordinate.latitude,
            longitude: post.coordinate.longitude,
            saved: post.saved,
          }
          )})
      
    
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




