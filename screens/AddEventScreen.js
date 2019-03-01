import React from 'react';
import { ScrollView, StyleSheet,Text, TextInput, View, TouchableOpacity, AsyncStorage } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Overlay from 'react-native-modal-overlay';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios'

export default class AddEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()

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
    let initState = {
      events: this.props.navigation.state.params.events,
      recentLocation: this.props.navigation.state.params.recentLocation,
      eventNameText: 'Title',
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
      myEvents: [],
    }
    initState.calendarSelected[this.getTodayDate()] = true
    
    return initState
  }

  //Fires on clicking the Title TextInput
  onTitleFocus() {
    if (this.state.eventNameTextColor != '#000') {
      this.setState({
        eventNameText: '',
        eventNameTextColor: '#000',
      })
    }
  }

  //Fires on defocusing the description field
  onTitleBlur() {
    if (this.state.eventNameText === '') {
      this.setState({
        eventNameText: 'Title',
        eventNameTextColor: '#D3D3D3',
      })
    }
  }

  //Fires on focusing the custom location field
  onCustomLocationFocus() {
    if (this.state.customLocationTextColor != '#000') {
      this.setState({
        customLocationText: '',
        customLocationTextColor: '#000',
      })
    }
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

  //Fires on pressing the calendar button
  onCalendar() {
    this.setState({
      calendarVisible: true,
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

  //Fires on clicking the Description TextInput
  onDescriptionFocus() {
    if (this.state.eventDescriptionTextColor != '#000') {
      this.setState({
        eventDescriptionText: '',
        eventDescriptionTextColor: '#000',
      })
    }
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

    let myEvents = this.state.myEvents
    if (myEvents === null) {
      myEvents = [newEvent]
    } else {
      myEvents.push(newEvent)
    }
    this.setState({myEvents})

    AsyncStorage.setItem('myEvents', JSON.stringify(myEvents)).then(() => {
      console.log("Added to My Events")
    })

    axios.post('https://quiet-spire-38612.herokuapp.com/api/events/', newEvent)
      .then(res => {
        newEvent._id = res.data.data._id
      }).then(() => {
        try {
          
        } catch {

        }
      })
      .catch(err => {
        console.log(err)
      })

    this.onCreateClose()
  }

  //Fires on closing of the Modal
  onCreateClose() {
    this.setState({
      eventNameText: 'Title',
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
    if (this.state.eventNameText === '') {
      this.setState({errText: "Event name cannot be empty.", errVisible: true})
      return true
    }
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
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <View style={styles.cancelContainer}>
            <TouchableOpacity onPress = {() => this.onCreateClose()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newEventContainer}>
            <Text style={styles.newEventText}>New Event</Text>
          </View>
          <View style={styles.submitContainer}>
            <TouchableOpacity onPress = {() => this.onSubmit()}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.formContainer}>
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

          <View style={styles.locationContainer}>
            <TextInput style = {{width: 245,
                                height: 50,
                                fontSize: 20,
                                color: this.state.customLocationTextColor}}
              multiline={false}
              value = {this.state.customLocationText}
              onChangeText = {(text) => {this.setState({customLocationText:text})}}
              onFocus = {() => this.onCustomLocationFocus()}
              onBlur = {() => this.onCustomLocationBlur()}>
            </TextInput>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateLabel}>
              <Text style={styles.dateText}>Event Date</Text>
            </View>
            <TouchableOpacity style={styles.dateButton}
              onPress= {() => this.onCalendar()}>
              <Text style={styles.dateText}>
                {Object.keys(this.state.calendarSelected)[0]}
              </Text>
            </TouchableOpacity>
          </View>
          <Overlay visible = {this.state.calendarVisible}
            onClose={() => this.onCloseCalendar()} closeOnTouchOutside>
            <Calendar
              date = {this.getTodayDate()}
              hideArrows = {false}
              minDate = {this.getTodayDate()}
              markedDates = {this.state.calendarSelected}
              onDayPress={(date) => this.onDateChange(date)}/>
          </Overlay>

          <View style={styles.startTimeContainer}>
            <View style={styles.startTimeLabel}>
              <Text style={styles.startTimeText}>Start</Text>
            </View>
            <TouchableOpacity style={styles.startTimeButton}
              onPress= {() => this.onStartTimePicker()}>
              <Text style={styles.startTimeText}>
                {this.parseEditTime(this.state.startDatetimeSelected.toString())}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode="time"
            titleIOS="Start Time" 
            is24Hour={false}
            isVisible={this.state.startTimePickerVisible}
            onConfirm={(date) => this.onConfirmStartTimePicker(date)}
            onCancel={() => this.onCloseStartTimePicker()}
            date={new Date(this.state.startDatetimeSelected)}/>

          <View style={styles.endTimeContainer}>
            <View style={styles.endTimeLabel}>
              <Text style={styles.endTimeText}>End</Text>
            </View>
            <TouchableOpacity style={styles.endTimeButton}
              onPress= {() => this.onEndTimePicker()}>
              <Text style={styles.endTimeText}>
                {this.parseEditTime(this.state.endDatetimeSelected.toString())}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode="time"
            titleIOS="End Time"
            is24Hour={false}
            isVisible={this.state.endTimePickerVisible}
            minimumDate={this.state.startDatetimeSelected}
            onConfirm={(date) => this.onConfirmEndTimePicker(date)}
            onCancel={() => this.onCloseEndTimePicker()}
            date={new Date(this.state.endDatetimeSelected)}/>

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

          <Overlay visible={this.state.errVisible} closeOnTouchOutside
            onClose={() => this.hideError()}>
            <Text>{this.state.errText}</Text>
          </Overlay>
        </ScrollView>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#4E2A84',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#a9a9a9',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  newEventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 15,
  },
  newEventText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 20,
  },
  submitButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f1ecf9'
  },
  titleContainer: {
    alignItems: 'flex-start',
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 50,
    marginTop: 20,
  },
  locationContainer: {
    alignItems: 'flex-start',
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 20,
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 50,
  },
  dateLabel: {
    paddingLeft: 15,
  },
  dateButton: {
    flex: 1,
    paddingRight: 15,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 16,
  },
  startTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 50,
  },
  startTimeLabel: {
    paddingLeft: 15,
  },
  startTimeButton: {
    flex: 1,
    paddingRight: 15,
    alignItems: 'flex-end',
  },
  startTimeText: {
    fontSize: 16,
  },
  endTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 10,
  },
  endTimeLabel: {
    paddingLeft: 15,
  },
  endTimeButton: {
    flex: 1,
    paddingRight: 15,
    alignItems: 'flex-end',
  },
  endTimeText: {
    fontSize: 16,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    height: 215,
    marginTop: 15,
  },
});