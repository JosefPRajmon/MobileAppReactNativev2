import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Metrics, Colors } from '../themes';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export const MainButton = (props: any) => {
  const {
    text,
    onButtonPress,
    iconName,
    iconType,
    containerStyle,
    buttonStyle,
    textStyle,
    disabled
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Button
        iconLeft
        style={[
          styles.button,
          buttonStyle,
          disabled && { backgroundColor: Colors.mainButton.disabledBackground }
        ]}
        disabled={disabled}
        onPress={onButtonPress}
      >
        {iconType === 'MaterialCommunityIcons' && (
          <MaterialCommunityIcons
            style={styles.icon}
            size={Metrics.icon.normal}
            name={iconName}
            color={Colors.mainButton.icon}
          />
        )}
        {iconType === 'Ionicon' && (
          <Ionicons
            style={styles.icon}
            size={Metrics.icon.normal}
            name={iconName}
            color={Colors.mainButton.icon}
          />
        )}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Metrics.padding.big,
    paddingBottom: Metrics.padding.normal
  },
  button: {
    backgroundColor: Colors.mainButton.background,
    padding: Metrics.margin.small,
    marginTop: Metrics.margin.normal
  },
  text: {
    color: Colors.mainButton.text
  },
  icon: {
    marginLeft: Metrics.margin.small
  }
});
