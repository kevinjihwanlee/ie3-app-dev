import React from 'react';
import { AppRegistry, FlatList, Platform, icon, Text, View, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'expo';

export default class Hotscreen2 extends React.Component {
  static navigationOptions = {
    title: 'Hot',
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
      <ScrollView style={styles.container}>
        <Text style={styles.searchbar}>SearchBar</Text>

        <View style={styles.divider}/>

        <View style={styles.eventlist}>
          <FlatList
            data={[
              {key: 'Hot Events'},
              {key: '  Event1'},
              {key: '  Event2'},
              {key: '  Event3'},
              {key: '  Event4'},
              {key: '  Event5'},
              {key: '  Event6'}
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>

        <View style={styles.divider}/>

        <View style={styles.icons}>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>    
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
        </View>
       
        <View style={styles.icons}>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>    
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
          <Icon.Ionicons name = {'..'} size = {80} style={styles.icon}/>
        </View>

        <View style={styles.divider}/>
        
        <View style={styles.topiclist}>
          <FlatList
            data={[
              {key: 'Hot Topics'},
              {key: '  #Topic1'},
              {key: '  #Topic2'},
              {key: '  #Topic3'},
              {key: '  #Topic4'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  searchbar: {
    flexDirection:'row',
    backgroundColor:'#c9ced6',
    marginLeft: 10,
    marginRight: 10, 
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 10,
  },
  eventlist: {
    flex: 1,
    marginLeft:10,
  },
  item: {
    fontSize: 18,
    height: 33,
  },
  icons: {
    flexDirection:'row',
  },
  icon: {
    marginLeft: 10,
    marginRight: 60,
  },
  divider: {
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topiclist: {
    marginLeft: 10,
  }
});
