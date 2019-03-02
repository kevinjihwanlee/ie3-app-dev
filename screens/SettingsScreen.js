import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text, Switch, View} from 'react-native';
import HideView from '../components/HideView.js'

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

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

  showOnLockScreen() {
    console.log("Switch Flipped")
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.switchLineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Enable Notifications</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch style={styles.switch}
                    onValueChange={value => this.setState({isHidden: !value})}
                    value={!this.state.isHidden}
            ></Switch>
          </View>
        </View>
        <HideView style={styles.hideViewContainer}
                  hide={this.state.isHidden}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Show on Lock Screen</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch style={styles.switch}
                    onValueChange={() => this.showOnLockScreen()}
            ></Switch>
          </View>  
        </HideView>
        <Text style={styles.title}>Privacy</Text>
        <View style={styles.switchLineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Require Passcode</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch style={styles.switch}></Switch>
          </View>
        </View>
        <Text style={styles.description}>Require a passcode to enter the app on your phone.</Text>
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
    borderColor: '#ededed',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  hideViewContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#ededed',
    borderBottomWidth: 0.25,
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
  description: {
    color:'#000',
    textAlign:'left',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    fontSize: 16,
  },
  button: { 
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor:'#fff',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: '#ededed',
  },
});