import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, Colors, Metrics } from '../../themes';

export function HeaderNavButton({ type }: any) {
  const navigation: any = useNavigation();

  function handlePress() {
    if (type === 'menu') {
      navigation.toggleDrawer();
    }
    if (type === 'back') {
      navigation.goBack();
    }
  }

  return (
    <TouchableOpacity
      style={[
        AppStyles.headerButton,
        { paddingHorizontal: Metrics.padding.normal }
      ]}
      onPress={() => handlePress()}
    >
      {type === 'menu' && (
        <Icon
          size={Metrics.icon.big}
          name='ios-menu'
          color={Colors.navHeader.buttonsColor}
        />
      )}
      {type === 'back' && (
        <Icon
          size={Metrics.icon.big}
          name='chevron-back-outline'
          color={Colors.navHeader.buttonsColor}
        />
      )}
    </TouchableOpacity>
  );
}
