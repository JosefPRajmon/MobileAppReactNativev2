import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Colors, Metrics } from '../../themes';
import { normalize } from '../../themes/Metrics';

export default function FormInput(props: any) {
  const { error, errorText, value, onBlur, multiline } = props;
  const [blur, setOnBlur]: any = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          blur && { borderColor: error ? 'red' : 'green' },
          multiline && { paddingTop: Metrics.padding.tinny }
        ]}
      >
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={Colors.input.placeholder}
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          onBlur={() => {
            setOnBlur(true);
            onBlur();
          }}
        />
      </View>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: Metrics.margin.small
  },
  wrapper: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: Metrics.radius.small,
    borderColor: Colors.input.border,
    paddingHorizontal: Metrics.padding.normal
  },
  input: {
    fontSize: Metrics.font.text,
    width: '100%'
  },
  errorText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 10,
    padding: 5,
    color: 'red'
  }
};
