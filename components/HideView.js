import React from 'react';
import {View} from 'react-native';

const HideView = (props) => {
    const { children, hide, style } = props;
    if (hide) {
      return null;
    }
    return (
      <View {...this.props} style={style}>
        { children }
      </View>
    );
  };

export default HideView