import React from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';
import MapView from 'react-native-maps'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#4E2A84', // northwestern purple
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      region: {
        latitude: 42.055984,
        longitude: -87.675171,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      }
    }
  }

  onRegionChange(region) {
    this.setState({region})
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapContainer}
                  region = {this.state.region}
                  onRegionChange = {() => this.onRegionChange}
                  showsUserLocation = {true}>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1
  },
});
