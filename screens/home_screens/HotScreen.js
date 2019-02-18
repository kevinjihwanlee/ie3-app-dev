import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { EventItem } from '../../components/EventItem';
import axios from 'axios';

const hot_events1 = [
    {
        id: '6',
        name: 'Shrek the Musical',
        author: 'rach',
        description: 'You know everyone\'s excited to see Shrek and the gang back at it again.',
        date_created: Date.now(),
        date_event: 'Feb 11',
        start_time: '6:00pm',
        end_time: '8:00pm',
        location: 'Cahn Auditorium',
        saved: 32,
        latitude: 42.05336,
        longitude: -87.672662,
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
        is_saved: true
    },
    {
        id: '5',
        name: 'Lunar New Year Parade',
        author: 'rach',
        description: 'Come see the parade in Chicago, it will be soo much fun with everyone there to cheer on our dancers and eat good food. We will provide free lanterns for our lantern lighting festival, we just ask you to bring cash for our food vendors at the event!',
        date_created: Date.now(),
        date_event: 'Feb 10',
        start_time: '1:00am',
        end_time: '6:00am',
        location: 'Chinatown, by Jill\'s Bakery',
        saved: 32,
        latitude: 42.05336,
        longitude: -87.672662,
      },
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
      is_saved: true
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
      is_saved: true
    }
  ];
  

export default class HotScreen extends React.Component {
  state = {
    posts:[ ]
  }
  componentDidMount(){
      axios.get('https://quiet-spire-38612.herokuapp.com/api/events/5c607e3c8149f900160c89f6')
        .then(res => {
          this.setState({
            posts: res.data.slice(1,10)
          })
        })
    }
    render() {
      const { posts } = this.state;
      const hot_events = posts.length ?  (
        posts.map(post => {
          return(
            { 
            id: post.id,
            name: post.name,
            author: post.author,
            description: '',
            date_created: post.date_created,
            date_event: '',
            start_time: '',
            end_time: '',
            location: '',
            saved: 2,
            latitude: post.latitude,
            longitude: post.longitude,
            is_saved: post.saved,
          }
          )})) : (
          [{
          id: '2',
          name: 'No Post Yet',
          author: 'David',
          description: 'No post yet',
          date_created: Date.now(),
          date_event: '',
          start_time: '0:00pm',
          end_time: '0:00pm',
          location: "",
          saved: 2,
          latitude: 0,
          longitude: 0,
          is_saved: true}]
          );
            
          
      
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

