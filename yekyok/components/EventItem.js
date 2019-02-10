import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

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
        sections={this.props.events}
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