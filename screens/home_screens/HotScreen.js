import React from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';
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
            this.setState({events: res.data.data}), () => {
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
            <EventItem events={this.state.events}></EventItem>
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
});

