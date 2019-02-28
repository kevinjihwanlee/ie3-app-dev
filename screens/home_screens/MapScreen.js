import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import MapView from 'react-native-maps';
import Overlay from 'react-native-modal-overlay';
import axios from 'axios'
import HideView from '../../components/HideView.js'

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()

    this.props.navigation.addListener('willFocus', 
      payload => {
        axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
          .then(res => {
            this.setState({events: res.data.data})
          })
          .catch(err => {
            console.log(err)
          })
      }
    )
  }

  //Sets state upon screen rendering
  getInitialState() {
    return {
      events: [],
      region: null,
      recentMarker: null,
      viewModalVisible: false,
      addingEvent: false,
    }
  }


  //MAP FUNCTIONS
  getRegion() {
    if (this.state.region === null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.004,
              longitudeDelta:  0.006,
            }
          })
        }
      )
    }
    return this.state.region
  }

  onRegionChange(region) {
    this.setState({region})
  }

  onMapClick(e) {
    if (this.state.addingEvent) {
      this.setState({
        addingEvent: false,
      })
      const {navigate} = this.props.navigation
      navigate('AddEvent', {
        events: this.state.events,
        recentLocation: e.nativeEvent.coordinate,
      })
    }
  }

  onMarkerClick(i) {
    if (this.state.addingEvent === false) {
      this.setState({
        viewModalVisible: true,
        recentMarker: i,
      })
    }
  }

  parseViewTime(t) {
    return t.substring(t.indexOf('T') + 1, t.indexOf('.') - 3)
  }


  //ADD EVENT FUNCTIONS
  onAddEventPress() {
    this.setState({
      addingEvent: true,
    })
  }

  closeEventAdd() {
    this.setState({
      addingEvent: false,
    })
  }


  //VIEW EVENT FUNCTIONS
  getRecentMarker() {
    const rm = this.state.recentMarker
    if (rm === null) {
      return {
        name: 'Error',
        description: 'Event Not Found',
        start_time: '',
        end_time: '',
        location: '',
      }
    } else {
      return rm
    }
  }

  onViewClose = () => this.setState({viewModalVisible: false})

  deleteEvent() {
    const rm = this.state.recentMarker
    let events = this.state.events
    for (i in events) {
      if (events[i].name === rm.name) {
        events.splice(i, 1)
        break
      }
    }
    this.setState({events})

    axios.delete(`https://quiet-spire-38612.herokuapp.com/api/events/` + this.state.recentMarker._id)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    this.onViewClose()
  }
  


  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapContainer}
          mapType= "standard"
          region = {this.getRegion()}
          onRegionChange = {() => this.onRegionChange()}
          zoomControlEnabled = {false}
          pitchEnabled = {false}
          moveOnMarkerPress = {false}
          toolbarEnabled = {false}
          onPress = {(e) => {this.onMapClick(e);}}
          showsUserLocation = {true}>
          {this.state.events.map((marker) => (
            <MapView.Marker
              key = {marker._id}
              coordinate = {marker.coordinate}
              onPress = {(e) => {e.stopPropagation(); this.onMarkerClick(marker);}}
              pinColor = '#4E2A84'/>
          ))}
        </MapView>

        <Overlay visible={this.state.viewModalVisible} closeOnTouchOutside
          onClose={this.onViewClose}
          childrenWrapperStyle={styles.viewEventOverlay}>
          <View>
            <Text>{this.getRecentMarker().name}</Text>
            <Text>{this.getRecentMarker().description}</Text>
            <Text>{this.getRecentMarker().location}</Text>
            <Text>{this.parseViewTime(this.getRecentMarker().start_time) + " - " + this.parseViewTime(this.getRecentMarker().end_time)}</Text>
            <TouchableOpacity style={styles.modalCancel}
              onPress = {() => this.deleteEvent()}>
              <Text>Delete Event</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        
        <HideView hide={this.state.addingEvent}>
          <TouchableOpacity style={styles.addOverlay}
            onPress = {() => this.onAddEventPress()}>
            <Image source={require('../../assets/images/AddEvent.png')}
              style = {{width: 100, height: 100}}
              resizeMode='contain'/>
          </TouchableOpacity>
        </HideView>

        <HideView hide={this.state.addingEvent === false}
          style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Choose Marker Location</Text>
        </HideView>

        <HideView hide={this.state.addingEvent === false}
          style={styles.closeCreate}>
          <TouchableOpacity onPress = {() => this.closeEventAdd()}>
            <Text style={styles.closeCreateText}>x</Text>
          </TouchableOpacity>
        </HideView>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    mapContainer: {
      flex: 1,
    },
    addOverlay: {
      flex: 1,
      position: 'absolute', 
      bottom: 12, 
      right: 12,
    },
    instructionContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 15,
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderRadius: 5,
      opacity: 0.75,
    },
    instructionText: {
      fontSize: 20,
      color: '#4E2A84',
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    closeCreate: {
      flex: 1,
      position: 'absolute',
      top: 5,
      right: 25,
    },
    closeCreateText: {
      fontSize: 60,
      color: '#4E2A84',
    },
    viewEventOverlay: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      height: 500,
      borderRadius: 25,
    },
  });