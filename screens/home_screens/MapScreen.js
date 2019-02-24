import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import MapView from 'react-native-maps';
import OverlayComponent from 'react-native-maps'
import Overlay from 'react-native-modal-overlay';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios'

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  //Sets state upon screen rendering
  getInitialState() {
    return {
      region: null,
      events: [],
      createModalVisible: false,
      recentLocation: null,
      userLocation: null,
      recentMarker: null,
      eventNameText: 'Event Name',
      eventNameTextColor: '#D3D3D3',
      eventDescriptionText: 'Description',
      eventDescriptionTextColor: '#D3D3D3',
      customLocationText: 'Location',
      customLocationTextColor: '#D3D3D3',
      calendarVisible: false,
      currDate: this.getTodayDate(),
      calendarSelected: {},
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startDatetimeSelected: new Date(),
      endDatetimeSelected: this.addMinutes(60, Date()),
      viewModalVisible: false,
      errVisible: false,
      errText: false,
    }
  }

  componentDidMount() {
    axios.get('https://quiet-spire-38612.herokuapp.com/api/events')
      .then(res => {
        this.setState({events: res.data.data})
      })
      .catch(err => {
        console.log(err)
      })
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

  //Fires on clicking the map
  onClick(e) {
    this.setState({
      createModalVisible: true,
      recentLocation: e.nativeEvent.coordinate
    })
  }

  onMarkerClick(i) {
    this.setState({
      viewModalVisible: true,
      recentMarker: i,
    })
  }





  //CREATE EVENT OVERLAY FUNCTIONS

  //Fires on clicking the Title TextInput
  onTitleFocus() {
    this.setState({
      eventNameText: '',
      eventNameTextColor: '#000',
    })
  }

  //Fires on defocusing the description field
  onTitleBlur() {
    if (this.state.eventNameText === '') {
      this.setState({
        eventNameText: 'EventName',
        eventNameTextColor: '#D3D3D3',
      })
    }
  }

  //Fires on clicking the Description TextInput
  onDescriptionFocus() {
    this.setState({
      eventDescriptionText: '',
      eventDescriptionTextColor: '#000',
    })
  }

  //Fires on defocusing the description field
  onDescriptionBlur() {
    if (this.state.eventDescriptionText === '') {
      this.setState({
        eventDescriptionText: 'Description',
        eventDescriptionTextColor: '#D3D3D3',
      })
    }
  }

  //Fires on pressing the calendar button
  onCalendar() {
    let selected = this.state.calendarSelected
    let todayDate = this.getTodayDate()
    if (Object.keys(selected).length === 0) {
      selected[todayDate] = {selected: true}
    }
    this.setState({
      calendarVisible: true,
      calendarSelected: selected,
      currDate: todayDate,
    })
  }

  //fires when another day on the calendar is pressed
  onDateChange(date) {
    let selected = {}
    selected[date.dateString] = {selected: true}
    this.setState({
      calendarSelected: selected
    })
  }

  //Returns today's date in string format
  getTodayDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    if (dd < 10) {dd = '0' + dd}
    if (mm < 10) {mm = '0' + mm}
    return yyyy + '-' + mm + '-' + dd
  }

  //fires when the calendar is closed
  onCloseCalendar() {
    this.setState({
      calendarVisible: false,
    })
  }

  addMinutes(num, d) {
    const dateD = new Date(d)
    return new Date(dateD.getTime() + num*60000)
  }

  //Fires on pressing the time picker button
  onStartTimePicker() {
    this.setState({
      startTimePickerVisible: true,
    })
  }

  //Fires on confirming in the time picker
  onConfirmStartTimePicker(datetime) {
    this.setState({
      startDatetimeSelected: datetime,
      startTimePickerVisible: false,
    })
  }

  //fires on closing of time picker
  onCloseStartTimePicker() {
    this.setState({
      startTimePickerVisible: false,
    })
  }

  //Fires on pressing the time picker button
  onEndTimePicker() {
    this.setState({
      endTimePickerVisible: true,
    })
  }

  //Fires on confirming in the time picker
  onConfirmEndTimePicker(datetime) {
    this.setState({
      endDatetimeSelected: datetime,
      endTimePickerVisible: false,
    })
  }

  //fires on closing of time picker
  onCloseEndTimePicker() {
    this.setState({
      endTimePickerVisible: false,
    })
  }

  //Fires on focusing the custom location field
  onCustomLocationFocus() {
    this.setState({
      customLocationText: '',
      customLocationTextColor: '#000',
    })
  }

  //Fires on defocusing the custom location field
  onCustomLocationBlur() {
    if (this.state.customLocationText === '') {
      this.setState({
        customLocationText: 'Location',
        customLocationTextColor: '#D3D3D3',
      })
    }
  }

  //Fires on pressing the submit button
  onSubmit() {
    if (this.submitErrors()) {
      return
    }

    const newEvent = {
      _id: null,
      name: this.state.eventNameText,
      author: "User1",
      description: this.state.eventDescriptionText,
      date_event: Object.keys(this.state.calendarSelected)[0],
      start_time: this.state.startDatetimeSelected,
      end_time: this.state.endDatetimeSelected,
      location: this.state.customLocationText,
      coordinate: this.state.recentLocation
    }

    axios.post('https://quiet-spire-38612.herokuapp.com/api/events/', newEvent)
      .then(res => {
        console.log(res.data)
        newEvent._id = res.data.data._id
      })
      .catch(err => {
        console.log(err)
      })

    let e = this.state.events
    e.push(newEvent)
    this.setState({events: e})

    this.onCreateClose()
  }

  //Fires on closing of the Modal
  onCreateClose = () => this.setState({calendarVisible: false,
                                createModalVisible: false,
                                eventNameText: 'Event Name',
                                eventNameTextColor: '#D3D3D3',
                                eventDescriptionText: 'Description',
                                eventDescriptionTextColor: '#D3D3D3',
                                calendarSelected: {},
                                customLocationText: 'Location',
                                customLocationTextColor: '#D3D3D3',
                                startTimePickerVisible: false,
                                endTimePickerVisible: false,
                                startDatetimeSelected: new Date(),
                                endDatetimeSelected: new Date(),
                              })

  submitErrors() {
    for (savedEvent of this.state.events) {
      if (this.state.eventNameText === savedEvent.name) {
        this.setState({errText: "Event name already taken.", errVisible: true})
        return true
      }
    }
    if (Date.parse(this.state.startDatetimeSelected) > Date.parse(this.state.endDatetimeSelected)) {
      this.setState({errText: "Start time must be before end time.", errVisible: true})
      return true
    }
    return false
  }

  hideError() {
    this.setState({errVisible: false})
  }




  //VIEW EVENT OVERLAY FUNCTIONS
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
  



  //RENDERING
  render() {
    return (
      <View style={styles.container}>

        <Overlay visible={this.state.createModalVisible}
          onClose={this.onCreateClose}
          childrenWrapperStyle={styles.modalContainer}
          >
          <ScrollView style={styles.modalViewContainer}>
            <View style={styles.titleContainer}>
              <TextInput style = {{width: 245,
                                  height: 50,
                                  fontSize: 20,
                                  color: this.state.eventNameTextColor}}
                multiline={false}
                value = {this.state.eventNameText}
                onChangeText = {(text) => {this.setState({eventNameText:text})}}
                onFocus = {() => this.onTitleFocus()}
                onBlur = {() => this.onTitleBlur()}>
              </TextInput>
            </View>

            <View style={styles.descriptionContainer}>
                <TextInput style = {{width: 245,
                                    height: 100,
                                    fontSize: 14,
                                    color: this.state.eventDescriptionTextColor}}
                  multiline={true}
                  value = {this.state.eventDescriptionText}
                  onChangeText = {(text) => {this.setState({eventDescriptionText:text})}}
                  onFocus = {() => this.onDescriptionFocus()}
                  onBlur = {() => this.onDescriptionBlur()}>
                </TextInput>
            </View>

            <TouchableOpacity style={styles.modalSubmit}
              onPress= {() => this.onCalendar()}>
                  <Text>Event Date: {this.state.currDate}</Text>
            </TouchableOpacity>
            <Overlay visible = {this.state.calendarVisible}
              onClose={() => this.onCloseCalendar()} closeOnTouchOutside>
              <Calendar
                date = {this.state.currDate}
                hideArrows = {false}
                minDate = {this.state.currDate}
                markedDates = {this.state.calendarSelected}
                onDayPress={(date) => this.onDateChange(date)}/>
            </Overlay>

            <TouchableOpacity style={styles.modalSubmit}
              onPress= {() => this.onStartTimePicker()}>
                  <Text>Start Time: {this.state.startDatetimeSelected.toString()}</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode="time"
              titleIOS="Start Time"
              is24Hour={false}
              isVisible={this.state.startTimePickerVisible}
              onConfirm={(date) => this.onConfirmStartTimePicker(date)}
              onCancel={() => this.onCloseStartTimePicker()}
              date={new Date(this.state.startDatetimeSelected)}
            />

            <TouchableOpacity style={styles.modalSubmit}
              onPress= {() => this.onEndTimePicker()}>
                  <Text>End Time: {this.state.endDatetimeSelected.toString()}</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode="time"
              titleIOS="End Time"
              is24Hour={false}
              isVisible={this.state.endTimePickerVisible}
              minimumDate={this.state.startDatetimeSelected}
              onConfirm={(date) => this.onConfirmEndTimePicker(date)}
              onCancel={() => this.onCloseEndTimePicker()}
              date={new Date(this.state.endDatetimeSelected)}
            />

            <View style={styles.locationContainer}>
              <TextInput style = {{width: 245,
                                  height: 35,
                                  fontSize: 14,
                                  color: this.state.customLocationTextColor}}
                multiline={false}
                value = {this.state.customLocationText}
                onChangeText = {(text) => {this.setState({customLocationText:text})}}
                onFocus = {() => this.onCustomLocationFocus()}
                onBlur = {() => this.onCustomLocationBlur()}>
              </TextInput>
            </View>

            <TouchableOpacity style={styles.modalSubmit}
              onPress = {() => this.onSubmit()}>
              <Text>Create Event</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancel}
              onPress = {() => this.onCreateClose()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>

          <Overlay visible={this.state.errVisible} closeOnTouchOutside
            onClose={() => this.hideError()}>
            <Text>{this.state.errText}</Text>
          </Overlay>
        </Overlay>



        <Overlay visible={this.state.viewModalVisible} closeOnTouchOutside
          onClose={this.onViewClose}>
          <Text>{this.getRecentMarker().name}</Text>
          <Text>{this.getRecentMarker().description}</Text>
          <Text>{this.getRecentMarker().location}</Text>
          <Text>{this.getRecentMarker().start_time + " - " + this.getRecentMarker().end_time}</Text>
          <TouchableOpacity style={styles.modalCancel}
            onPress = {() => this.deleteEvent()}
          >
            <Text>Delete Event</Text>
          </TouchableOpacity>
        </Overlay>




        <MapView style={styles.mapContainer}
          mapType= "standard"
          region = {this.getRegion()}
          onRegionChange = {() => this.onRegionChange()}
          zoomControlEnabled = {false}
          pitchEnabled = {false}
          moveOnMarkerPress = {false}
          toolbarEnabled = {false}
          onPress = {this.onClick.bind(this)}
          showsUserLocation = {true}>
          {this.state.events.map((marker) => (
            <MapView.Marker
              key = {marker.name}
              coordinate = {marker.coordinate}
              onPress = {(e) => {e.stopPropagation(); this.onMarkerClick(marker);}}/>
          ))}
        </MapView>
        <TouchableOpacity style={styles.addOverlay}>
          <Image source={require('../../assets/images/AddEvent.png')}
            style = {{width: 110, height: 110}}
            resizeMode='contain'/>
        </TouchableOpacity>
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
    modalContainer: {
      borderRadius: 10,
      width: 300,
      height: 500,
      alignSelf: 'center',
    },
    modalViewContainer: {
      flex: 1,
    },
    titleContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      width: 260,
      height: 50,
      marginBottom: 10,
    },
    descriptionContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      width: 260,
      height: 100,
    },
    locationContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      width: 260,
      height: 35,
    },
    modalSubmit: {
      alignSelf: 'center',
      paddingTop: 15,
      paddingBottom: 15,
    },
    modalCancel: {
      alignSelf: 'center',
    },
    addOverlay: {
      flex: 1,
      position: 'absolute', 
      bottom: 15, 
      right: 15,
    }
  });