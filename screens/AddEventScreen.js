import React from 'react';
import { ScrollView, StyleSheet,Text, TextInput, View, TouchableOpacity } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Overlay from 'react-native-modal-overlay';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios'

export default class AddEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    let initState = {
      events: this.props.navigation.state.params.events,
      recentLocation: this.props.navigation.state.params.recentLocation,
      eventNameText: 'Event Name',
      eventNameTextColor: '#D3D3D3',
      eventDescriptionText: 'Description',
      eventDescriptionTextColor: '#D3D3D3',
      customLocationText: 'Location',
      customLocationTextColor: '#D3D3D3',
      calendarVisible: false,
      calendarSelected: {},
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startDatetimeSelected: new Date(),
      endDatetimeSelected: this.addMinutes(60, Date()),
    }
    initState.calendarSelected[this.getTodayDate()] = true
    return initState
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
    let selected = this.state.calendarSelected
    let todayDate = this.getTodayDate()
    if (Object.keys(selected).length === 0) {
      selected[todayDate] = {selected: true}
    }
    this.setState({
      calendarVisible: true,
      calendarSelected: selected,
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

  parseEditTime(t) {
    const colonIndex = t.indexOf(':')
    return t.substring(colonIndex - 2, colonIndex + 3)
  }

  //Fires on pressing the time picker button
  onStartTimePicker() {
    this.setState({
      startTimePickerVisible: true,
    })
  }

  //Fires on confirming in the time picker
  onConfirmStartTimePicker(datetime) {
    const diff = (datetime - Date.parse(this.state.startDatetimeSelected)) / 60000
    this.setState({
      startDatetimeSelected: datetime,
      endDatetimeSelected: this.addMinutes(diff, this.state.endDatetimeSelected),
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
      coordinate: this.state.recentLocation,
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
  onCreateClose() {
    this.setState({
      eventNameText: 'Event Name',
      eventNameTextColor: '#D3D3D3',
      eventDescriptionText: 'Description',
      eventDescriptionTextColor: '#D3D3D3',
      calendarSelected: {},
      calendarVisible: false,
      customLocationText: 'Location',
      customLocationTextColor: '#D3D3D3',
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startDatetimeSelected: new Date(),
      endDatetimeSelected: new Date(),
    })
    const {navigate} = this.props.navigation
    navigate('Map')
  }

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

  render() {
    return (
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
                  <Text>Event Date: {Object.keys(this.state.calendarSelected)[0]}</Text>
            </TouchableOpacity>
            <Overlay visible = {this.state.calendarVisible}
              onClose={() => this.onCloseCalendar()} closeOnTouchOutside>
              <Calendar
                date = {this.getTodayDate()}
                hideArrows = {false}
                minDate = {this.getTodayDate()}
                markedDates = {this.state.calendarSelected}
                onDayPress={(date) => this.onDateChange(date)}/>
            </Overlay>

            <TouchableOpacity style={styles.modalSubmit}
              onPress= {() => this.onStartTimePicker()}>
                  <Text>Start Time: {this.parseEditTime(this.state.startDatetimeSelected.toString())}</Text>
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
                  <Text>End Time: {this.parseEditTime(this.state.endDatetimeSelected.toString())}</Text>
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

            <Overlay visible={this.state.errVisible} closeOnTouchOutside
              onClose={() => this.hideError()}>
              <Text>{this.state.errText}</Text>
            </Overlay>
          </ScrollView>   
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
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