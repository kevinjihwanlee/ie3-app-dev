import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const events = [
  {
    id: '1',
    name: 'Norris Grand Opening',
    author: 'id123',
    description: 'Come celebrate the grand opening of Norris with free food!',
    date_created: Date.now(),
    date_event: Date.now(),
    date_event_disp: 'Oct 8',
    saved: 2,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '2',
    name: 'a party',
    author: 'id321',
    description: 'party to end all parties at ridge and noyes, you cannot miss this spectacle',
    date_created: Date.now(),
    date_event: Date.now(),
    date_event_disp: 'Feb 8',
    saved: 45,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '3',
    name: 'Rachael\'s 21st Birthday!',
    author: 'rach',
    description: 'better than the party above because it has a really long description, so you can test what long descriptions do',
    date_created: Date.now(),
    date_event: Date.now(),
    date_event_disp: 'Feb 8',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  },
]

export class EventItem extends React.Component {
  render() {
    return <View>
      {
        events.map((event, index) => (
          <ListItem
            containerStyle={styles.greyBar}
            key={index} 
            leftAvatar={{ source: { uri: 'www.google.com' } }}
            title={event.name}
            titleStyle={{width:210}}
            subtitle={(event.description.length < 90) ? event.description : (event.description.substring(0, 85) + "...")}
            subtitleStyle={{width: 210}}
            rightSubtitle={event.date_event_disp}
            badge={{value: event.saved, badgeStyle: {backgroundColor: '#4E2A84', top: -35}}}
          />
        ))
      }
    </View>;
  }
}

const styles = StyleSheet.create({
  greyBar: {
    backgroundColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 120,
    borderRadius: 25,
  }
});