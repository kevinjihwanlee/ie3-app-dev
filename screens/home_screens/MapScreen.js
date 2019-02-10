import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

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
      },
      markers: [
        {
          id:300,
          coordinate: {
            latitude: 42.055984,
            longitude: -87.675171,
          },
          title: "Marker 1",
        }
      ]
    }
  }

  addMarker(coord, t) {
    let m = this.state.markers
    m.push({
      id: m.length,
      coordinate: coord,
      title: t,
    })
    this.setState({markers: m})
  }

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
  
  onRegionChange(region) {
    this.setState({region})
  }

  onClick(e) {
    this.addMarker(e.nativeEvent.coordinate, "hi")
  }

  render() {
    return (
      <View style={styles.container}>
        <View></View>
        <MapView style={styles.mapContainer}
          region = {this.state.region}
          onRegionChange = {() => this.onRegionChange}
          onPress = {this.onClick.bind(this)}
          showsUserLocation = {true}>
          {this.state.markers.map((marker) => (
            <MapView.Marker
              key = {marker.id}
              coordinate = {marker.coordinate}
              title = {marker.title}/>
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
      flex: 1
    },
  });