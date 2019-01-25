import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text, Switch, View} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#4E2A84',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  };

  logOut() {
    console.log("User Logged Out.")
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Privacy</Text>
        <View style={styles.switchLineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Protect Your Notifications</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch style={styles.switch}></Switch>
          </View>
        </View>
        <Text style={styles.description}>Use your phone's Touch ID or passcode to protect your posts and replies so only you can view them.</Text>
        <Text style={styles.title}>Second Setting</Text>
        <TouchableOpacity style={styles.button}
                  onPress={() => this.logOut()}
                  underlayColor='#fff'>
                  <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1ecf9',
  },
  title: {
    color:'#4E2A84',
    textAlign:'left',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 26,
  },
  switchLineContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  text: {
    color:'#000',
    fontSize: 18,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 25,
  },
  switch: {
    
  },
  button: { 
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:'#fff',
  },
  description: {
    color:'#000',
    textAlign:'left',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    fontSize: 16,
  },
  logoutText: {
    color:'red',
    textAlign:'center',
    paddingTop:5,
    paddingBottom:5,
    fontSize:20,
  },
});