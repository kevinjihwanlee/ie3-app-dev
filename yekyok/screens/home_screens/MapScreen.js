import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MapView from 'react-native-maps'

export default class MapScreen extends React.Component {
    static navigationOptions = {
      title: 'Map',
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
              <View></View>
              <MapView style={styles.mapContainer}
                region = {this.state.region}
                onRegionChange = {() => this.onRegionChange}
                showsUserLocation = {true}>
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
      flex: 1
    },
  });