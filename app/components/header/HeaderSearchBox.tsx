import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

export function HeaderSearchBox(props: any) {
  const { value, onFocus, onChangeText, placeholder, searchBoxOnPress } = props;

  return (
    <TouchableOpacity
      onPress={searchBoxOnPress}
      style={styles.searchBoxContainer}
    >
      <View style={styles.searchBoxGlue}>
        <TextInput
          value={value}
          onFocus={onFocus}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.searchBoxTextStyle}
          placeholderTextColor={Colors.input.placeholder}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchBoxGlue: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchBoxTextStyle: {
    left: 3,
    width: '100%',
    fontSize: Metrics.font.text,
    color: '#000',
    height: 50,
    backgroundColor: 'transparent'
  },
  searchBoxContainer: {
    left: 8,
    padding: 6,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: 30,
    borderRadius: 6,
    backgroundColor: Colors.navHeader.searchBarBackground
  }
});
