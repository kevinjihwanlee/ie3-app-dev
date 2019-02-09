import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

const events = [
  {
    id: '1',
    name: 'Rachael\'s 21st Birthday!',
    author: 'rach',
    description: 'better than the party below because it has a really long description, so you can test what long descriptions do, in case that is interesting content to know about. We can make this section as long as we want with as much text as we want.',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '1:00am',
    location: '1024 Noyes Avenue, Evanston, IL 60201',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '2',
    name: 'Norris Grand Opening',
    author: 'id123',
    description: 'Come celebrate the grand opening of Norris with free food!',
    date_created: Date.now(),
    date_event: 'Oct 8',
    start_time: '1:00pm',
    end_time: '4:00pm',
    location: "Norris Student Center at Northwestern University",
    saved: 2,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '3',
    name: 'a party',
    author: 'id321',
    description: 'party to end all parties at ridge and noyes, you cannot miss this spectacle. lots of good times and chips and dip. welcome to all! :)',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '3:00am',
    location: 'mikalya\'s place, 1514 Ridge Place',
    saved: 45,
    latitude: 42.05336,
    longitude: -87.672662,
  }
]

export class EventItem extends React.Component {
  state = {
    activeSections: [],
  };
  _renderHeader = event => {
    return (
        <ListItem
                containerStyle={styles.greyBar}
                leftAvatar={{ source: { uri: 'www.google.com' } }}
                title={event.name}
                titleStyle={{width:210, fontWeight:'bold'}}
                subtitle={(event.description.length < 90) ? event.description : (event.description.substring(0, 85) + "...")}
                subtitleStyle={{width: 210}}
                rightSubtitle={event.date_event}
                badge={{value: event.saved, badgeStyle: {backgroundColor: '#4E2A84', top: -35}}}
        />
    );
  };

  _renderContent = event => {
    return (
      <ListItem
              containerStyle={styles.greyBarExpanded}
              title={(event.description.length < 90) ? undefined : ("..." + event.description.substring(85) + "\n")}
              titleStyle={{width: 230, paddingLeft:10, paddingTop:20, fontSize:15}}
              subtitle={'@ ' + event.location}
              subtitleStyle={{fontWeight:'bold', paddingLeft:10, width: 230, textAlignVertical:'top'}}
              rightSubtitle={event.start_time + ' to ' + event.end_time}
              rightSubtitleStyle={{paddingTop:20}}
      />
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={events}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        underlayColor='#fff'
      />
    );
  }
}

const styles = StyleSheet.create({
  greyBar: {
    backgroundColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    height: 120,
    borderRadius: 25,
  },
  greyBarExpanded: {
    marginTop: -30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 25,
    borderColor:'#ededed',
    borderStyle:'dashed',
    borderWidth: 10,

  }
});