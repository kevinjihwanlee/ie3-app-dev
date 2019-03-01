import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native';
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

        try {
          AsyncStorage.getItem('saved').then((value) => {
            let savedEvents = JSON.parse(value)
            const now = new Date()
            for (i in savedEvents) {
              if (Date.parse(savedEvents[i].end_time) < now) {
                savedEvents.splice(i, 1)
              }
            }
            this.setState({savedEvents})
            AsyncStorage.setItem('saved', JSON.stringify(savedEvents))
          })
        } catch (error) {
          console.log(error.message)
        }
    
        try {
          AsyncStorage.getItem('myEvents').then((value) => {
            this.setState({myEvents: JSON.parse(value)})
          })
        } catch (error) {
          console.log(error.message)
        }
      }
    )
  }

  getInitialState() {
    return {
      events: [],
      region: null,
      recentMarker: null,
      viewModalVisible: false,
      addingEvent: false,
      savedEvents: [],
      myEvents: [],
    }
  }


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
      if (this.isMyEvent(i)) {
        this.setState({
          editModalVisible: true,
          recentMarker: i,
        })
      } else {
        this.setState({
          viewModalVisible: true,
          recentMarker: i,
        })
      }
    }
  }

  parseViewTime(t) {
    let newTime = t.substring(t.indexOf('T') + 1, t.indexOf('.') - 3)
    let newPrefix = parseInt(newTime.substring(0, newTime.indexOf(':'))) - 6
    if (newPrefix < 0) {
      newPrefix += 24
    }
    newPrefix = newPrefix.toString()
    if (newPrefix.length === 1) {
      newPrefix = '0' + newPrefix
    }
    return newPrefix + newTime.substring(newTime.indexOf(':'))
  }


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


  getRecentMarker() {
    const rm = this.state.recentMarker
    if (rm === null) {
      return {
        name: 'Error',
        description: 'Event Not Found',
        start_time: '',
        end_time: '',
        location: '',
        date_event: '',
      }
    } else {
      return rm
    }
  }

  onViewClose = () => this.setState({viewModalVisible: false})

  onEditClose = () => this.setState({editModalVisible: false})

  isStarred(event) {
    if (this.state.events !== null) {
      for (item of this.state.savedEvents) {
        if (event._id === item._id) {
          return true
        }
      }
    }
    return false
  }

  saveEvent() {
    let marker = this.state.recentMarker

    console.log(this.state.savedEvents)
    let savedEvents = this.state.savedEvents
    if (this.isStarred(marker)) {
      marker.saved -= 1
      for (i in savedEvents) {
        if (savedEvents[i]._id === marker._id) {
          savedEvents.splice(i, 1)
          break
        }
      }
    } else {
      marker.saved += 1
      savedEvents.push(marker)
    }

    let events = this.state.events
    for (i in events) {
      if (events[i]._id === marker._id) {
        events[i] = marker
        break
      }
    }

    let myEvents = this.state.myEvents
    for (i in myEvents) {
      if (myEvents[i]._id === marker._id) {
        myEvents[i] = marker
        break
      }
    }
    
    this.setState({
      events: events,
      recentMarker: marker,
      savedEvents: savedEvents,
      myEvents: myEvents,
    })

    axios.patch(`https://quiet-spire-38612.herokuapp.com/api/events/` + marker._id, {
      saved: marker.saved,
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  
    AsyncStorage.setItem('saved', JSON.stringify(savedEvents))
  }

  getStarText(event) {
    if (this.isStarred(event)) {
      return "Event Saved!"
    } else {
      return "Save Event"
    }
  }

  isMyEvent(event) {
    if (event.name === "Error") {
      return
    }
    for (item of this.state.myEvents) {
      if (event.name === item.name) {
        return true
      }
    }
    return false
  }


  deleteEvent() {
    const rm = this.state.recentMarker
    let events = this.state.events
    let savedEvents = this.state.savedEvents
    let myEvents = this.state.myEvents
    for (i in events) {
      if (events[i]._id === rm._id) {
        events.splice(i, 1)
        break
      }
    }
    for (i in savedEvents) {
      if (savedEvents[i]._id === rm._id) {
        savedEvents.splice(i, 1)
        break
      }
    }
    for (i in myEvents) {
      if (myEvents[i]._id === rm._id) {
        myEvents.splice(i, 1)
        break
      }
    }
    this.setState({
      events: events, 
      savedEvents: savedEvents,
      myEvents: myEvents
    })

    axios.delete(`https://quiet-spire-38612.herokuapp.com/api/events/` + this.state.recentMarker._id)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    AsyncStorage.setItem('saved', JSON.stringify(savedEvents))
    AsyncStorage.setItem('myEvents', JSON.stringify(myEvents))

    this.onEditClose()
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
          showsUserLocation = {true}
          userLocationAnnotationTitle = {""}>
          {this.state.events.map((marker) => (
            <MapView.Marker
              key = {marker._id}
              coordinate = {marker.coordinate}
              onPress = {(e) => {e.stopPropagation(); this.onMarkerClick(marker);}}
              pinColor = '#4E2A84'/>
          ))}
        </MapView>

        <HideView hide={this.state.addingEvent}>
          <TouchableOpacity style={styles.addOverlay}
            onPress = {() => this.onAddEventPress()}>
            <Image source={{uri: 'http://i68.tinypic.com/2e2fb4y.png'}}
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

        <Overlay visible={this.state.viewModalVisible} closeOnTouchOutside
          onClose={this.onViewClose}
          childrenWrapperStyle={styles.viewEventOverlay}
          containerStyle={styles.viewEventContainer}>

          <View style={styles.eventNameContainer}>
            <Text style={styles.eventNameText}>{this.getRecentMarker().name}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{this.getRecentMarker().location}</Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              {this.getRecentMarker().date_event + "  ~  " + this.parseViewTime(this.getRecentMarker().start_time) + " - " + this.parseViewTime(this.getRecentMarker().end_time)}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.getRecentMarker().description}</Text>
          </View>
          
          <View style={styles.starButtonContainerStyle}>
            <TouchableOpacity onPress = {() => this.saveEvent()}>
              <Text>{this.getStarText(this.getRecentMarker())}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.numSaved}>
            <Text>{this.getRecentMarker().saved + ' people have saved this event.'}</Text>
          </View>

        </Overlay>

        <Overlay visible={this.state.editModalVisible} closeOnTouchOutside
          childrenWrapperStyle={styles.editEventOverlay}
          containerStyle={styles.editEventContainer}
          onClose={this.onEditClose}>
          <View style={styles.eventNameContainer}>
            <Text style={styles.eventNameText}>{this.getRecentMarker().name}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{this.getRecentMarker().location}</Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              {this.getRecentMarker().date_event + "  ~  " + this.parseViewTime(this.getRecentMarker().start_time) + " - " + this.parseViewTime(this.getRecentMarker().end_time)}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text>{this.getRecentMarker().description}</Text>
          </View>

          <View style={styles.starButtonContainerStyle}>
            <TouchableOpacity onPress = {() => this.saveEvent()}>
              <Text>{this.getStarText(this.getRecentMarker())}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numSaved}>
            <Text>{this.getRecentMarker().saved + ' people have saved this event.'}</Text>
          </View>

          <TouchableOpacity style={styles.modalCancel}
            onPress = {() => this.deleteEvent()}>
            <Text>Delete Event</Text>
          </TouchableOpacity>
        </Overlay>

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
    top: 4,
    right: 25,
  },
  closeCreateText: {
    fontSize: 60,
    color: '#4E2A84',
  },
  viewEventContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  viewEventOverlay: {
    borderRadius: 25,
    backgroundColor: '#fff'
  },
  eventNameContainer: {
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  eventNameText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  locationContainer: {
    marginTop: 5,
  },
  locationText: {
    fontStyle: "italic",
    fontSize: 18,
  },
  dateTimeContainer: {
    marginTop: 3,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
  },
  descriptionContainer: {
    marginBottom: 12,
  },
  starButtonContainerStyle: {
    marginBottom: 10,
  },
  numSaved: {
    marginBottom: 10,
  },
  editEventOverlay: {
    borderRadius: 25,
    backgroundColor: '#fff'
  },
  editEventContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});