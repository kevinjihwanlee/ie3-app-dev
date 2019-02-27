import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../../components/EventItem';
import axios from 'axios';


export default class NewScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events:[ ]
    }
  }

  newDatelimit(self){
    var date1 = new Date('December 1, 2019 00:00:00')
    var date2 = new Date('December 1, 2019 12:00:00')
    numericValueOfDateDifference = date2.getTime() - date1.getTime()
    return numericValueOfDateDifference
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
      var new_events = []
      const currentTime = new Date()
      
      for (var i = 0;i < events.length; i++){
        a = events[i]
        eventTime = new Date(a.date_created)
        if (-eventTime.getTime()+currentTime.getTime()<=this.newDatelimit()){
          new_events.push({
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
                <Text style={styles.headings}>new events</Text>
                <View style={styles.divider}/>
                <EventItem events={new_events}></EventItem>
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

