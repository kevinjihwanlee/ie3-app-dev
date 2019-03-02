import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { EventItem } from '../../components/EventItem';
import axios from 'axios'

export default class HotScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }

    this.props.navigation.addListener('willFocus', 
      payload => {
        axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
          .then(res => {
            let events = res.data.data
            const now = new Date()
            for (i in events) {
              if (Date.parse(events[i].end_time) < now) {
                events.splice(i, 1)
              }
            }
            this.setState({events}), () => {
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
      const hotEvents = this.state.events.sort(function(a, b) {
        return b.saved - a.saved
      })
      const hotDateEvents = hotEvents.sort(function(a, b) {
        return Date.parse(b.start_time) - Date.parse(a.start_time)
      })
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.headings}>hot events</Text>
          <View style={styles.divider}/>
          <EventItem events={hotDateEvents}></EventItem>
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
    fontSize: 30,
    textAlign:'center',
    color: '#4E2A84',
  },
  divider: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
  },
});

