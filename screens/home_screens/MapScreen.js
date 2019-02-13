import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import MapView from 'react-native-maps';
import Overlay from 'react-native-modal-overlay';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.onDateChange = this.onDateChange.bind(this)
  }

  //Sets state upon screen rendering
  getInitialState() {
    return {
      region: {
        latitude: 42.055984,
        longitude: -87.675171,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      },
      markers: this.setInitialMarkers(),
      modalVisible: false,
      recentLocation: null,
      eventNameText: 'Event Name',
      eventNameTextColor: '#D3D3D3',
      eventDescriptionText: 'Description',
      eventDescriptionTextColor: '#D3D3D3',
      customLocationText: 'Location',
      customLocationTextColor: '#D3D3D3',
      calendarVisible: false,
      currDate: this.getTodayDate(),
      calendarSelected: {},
      timePickerVisible: false,
    }
  }

  //Sets the list of initial markers to appear on the map
  setInitialMarkers() { //should get list of current events and set here
    return []
  }

  //Fires on clicking the map
  onClick(e) {
    this.setState({
      modalVisible: true,
      recentLocation: e.nativeEvent.coordinate
    })
  }

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
    let todayDate = this.getTodayDate()
    let selected = this.state.calendarSelected
    selected[todayDate] = {selected: true}
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

  //Fires on pressing the calendar button
  onTimePicker() {
    this.setState({
      timePickerVisible: true,
    })
  }

  onConfirmTimePicker(date) {
    console.log(date)
    this.setState({
      timePickerVisible: false,
    })
  }

  onCloseTimePicker() {
    this.setState({
      timePickerVisible: false,
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
    //save everything
    let m = this.state.markers
    m.push({
      id: m.length,
      coordinate: this.state.recentLocation,
    })
    this.setState({markers: m})
    this.onClose()
  }

  //Fires on closing of the Modal
  onClose = () => this.setState({calendarVisible: false,
                                modalVisible: false,
                                eventNameText: 'Event Name',
                                eventNameTextColor: '#D3D3D3',
                                eventDescriptionText: 'Description',
                                eventDescriptionTextColor: '#D3D3D3',
                                calendarSelected: {},
                                customLocationText: 'Location',
                                customLocationTextColor: '#D3D3D3',
                              })

  //Method for removing markers; not used yet
  removeMarker(id) {
    let m = this.state.markers
    for (index in m) {
      if (m[index].id === id) {
        m.splice(index, 1)
        break
      }
    }
    this.setState({markers: m})
  }
  
  //Keeping track of where we are
  onRegionChange(region) {
    this.setState({region})
  }

  render() {
    return (
      <View style={styles.container}>
        <Overlay visible={this.state.modalVisible}
          onClose={this.onClose}
          childrenWrapperStyle={styles.modalContainer}>
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
                  <Text>Show Calendar</Text>
            </TouchableOpacity>
            <Overlay visible = {this.state.calendarVisible}
              onClose={() => this.onCloseCalendar()} closeOnTouchOutside>
              <Calendar
                date = {this.state.currDate}
                markedDates = {this.state.calendarSelected}
                onDayPress={(date) => this.onDateChange(date)}/>
            </Overlay>

            <TouchableOpacity style={styles.modalSubmit}
              onPress= {() => this.onTimePicker()}>
                  <Text>Show Time Picker</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode="time"
              titleIOS="Start Time"
              is24Hour={false}
              isVisible={this.state.timePickerVisible}
              onConfirm={(date) => this.onConfirmTimePicker(date)}
              onCancel={() => this.onCloseTimePicker()}
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
              onPress = {() => this.onClose()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </Overlay>
        <MapView style={styles.mapContainer}
          region = {this.state.region}
          onRegionChange = {() => this.onRegionChange}
          onPress = {this.onClick.bind(this)}
          showsUserLocation = {true}>
          {this.state.markers.map((marker) => (
            <MapView.Marker
              key = {marker.id}
              coordinate = {marker.coordinate}/>
          ))}
        </MapView>
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
  });


/*
Things to do:
-Time select
-invite-only and list of invitees
-Save info in events

-Save events
-Delete/edit events
-Style
*/