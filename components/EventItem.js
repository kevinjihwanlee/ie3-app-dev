import React from 'react';
import { StyleSheet } from 'react-native';
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
        title={event.name}
        titleStyle={{left: 5, width:240, fontWeight:'bold'}}
        subtitle={(event.description.length < 110) ? event.description : (event.description.substring(0, 100) + "...")}
        subtitleStyle={{left: 5, width: 250}}
        rightSubtitle={(event.saved === undefined) ? '☆ ' + '0' : '☆ ' + event.saved}
        rightSubtitleStyle={{top: 35, left: 80}}
        badge={{value: event.date_event, badgeStyle: {backgroundColor: '#4E2A84', top: -35}}}
      />
    );
  };

  parseViewTime(t) {
    let newTime = t.substring(t.indexOf('T') + 1, t.indexOf('.') - 3)
    let newPrefix = parseInt(newTime.substring(0, newTime.indexOf(':'))) - 6
    if (newPrefix < 0) {
      newPrefix += 24
    }
    newPrefix = newPrefix.toString()
    if (newPrefix.length === 1) {
      newPrefix = '0' + newPrefix
    }
    return newPrefix + newTime.substring(newTime.indexOf(':'))
  }

  _renderContent = event => {
    return (
      <ListItem
        containerStyle={styles.greyBarExpanded}
        title={(event.description.length < 95) ? undefined : ("..." + event.description.substring(85) + "\n")}
        titleStyle={{width: 220, paddingLeft:10, paddingTop:20, fontSize:15}}
        subtitle={'@ ' + event.location}
        subtitleStyle={{fontWeight:'bold', paddingLeft:10, width: 230, textAlignVertical:'top'}}
        rightSubtitle={this.parseViewTime(event.start_time) +  '-\n' + this.parseViewTime(event.end_time)}
        rightSubtitleStyle={{paddingTop:20, textAlign:'center'}}
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
    height: 110,
    borderRadius: 15,
  },
  greyBarExpanded: {
    marginTop: -30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 15,
    borderColor:'#ededed',
    borderStyle:'dashed',
    borderWidth: 10,
  }
});