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
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.headings}>hot events</Text>
          <View style={styles.divider}/>
          <EventItem events={this.state.events.sort(function(a, b) {
            return b.saved - a.saved
          })}></EventItem>
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
    color: '#a9a9a9',
  },
  divider: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
  },
});

