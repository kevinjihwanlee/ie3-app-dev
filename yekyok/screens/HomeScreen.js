import React from 'react';
import { ScrollView,StyleSheet,View} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} >
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
