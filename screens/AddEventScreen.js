import React from 'react';
import DatePicker from 'react-native-datepicker';
import { ScrollView, StyleSheet,Text, TextInput, View } from 'react-native';
import moment from 'moment';

export default class AddEventScreen extends React.Component {
  static navigationOptions = {
    title: "Add Event",
  }

  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      eventDescription: '',
      eventAddress: '',
      date: new Date(),
      time: '12:00',
      hours: 0,
      minutes: 0,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.title}>Create An Event</Text>
        <View style = {styles.box}>
          <TextInput style = {styles.input}
          placeholder = "Name your event! (50 character maximum)"
          multiline = {true}
          numberOfLines = {2}
          onChangeText = {(eventTitle) => this.setState({eventTitle})}
          maxLength = {50}
          />
        </View>
        <View style = {styles.box}>
          <TextInput style = {styles.input}
          placeholder = "Description"
          multiline = {true}
          numberOfLines = {5}
          onChangeText = {(eventDescription) => this.setState({eventDescription})}
          maxLength = {300}
          />
        </View>
        <View style = {styles.box}>
          <TextInput style = {styles.input}
          placeholder = "Address"
          multiline = {true}
          numberOfLines = {6}
          onChangeText = {(eventAddress) => this.setState({eventAddress})}
          maxLength = {50}
          />
        </View>
        <View style = {styles.box}>
        <DatePicker
        style={{width: 320}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= {moment(new Date()).format('YYYY-MM-DD')}
        maxDate={moment(new Date()).add(1, 'years').format('YYYY-MM-DD') }
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
        </View>
      </ScrollView>
    );
  }

}

//function getCurrentDate(){
  //var newDate = moment(new Date()).format('DD-MM-YYYY');
  //return newDate;
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    color:'#4E2A84',
    textAlign:'left',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 26,
  },
  box: {
    padding: 20,
  },
  input: {
    height:60,
    borderColor: '#4E2A84',
    borderWidth: 2,
    fontSize: 15,
  },

});