import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MmvmIcon } from '../../themes/Fonts';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AppStyles, Colors, Metrics } from '../../themes';

export function HeaderButton(props: any) {
  const { iconName, iconType, onPress } = props;

  return (
    <TouchableOpacity style={AppStyles.headerButton} onPress={() => onPress()}>
      {iconType === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          size={Metrics.icon.normal}
          name={iconName}
          color={Colors.navHeader.buttonsColor}
        />
      )}
      {iconType === 'Ionicon' && (
        <Ionicons
          size={Metrics.icon.normal}
          name={iconName}
          color={Colors.navHeader.buttonsColor}
        />
      )}
      {iconType === 'MmvmIcon' && (
        <MmvmIcon
          size={Metrics.icon.normal}
          name={iconName}
          color={Colors.navHeader.buttonsColor}
        />
      )}
    </TouchableOpacity>
  );
}
