import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, ...props }: any) {
    return (
        <TouchableOpacity activeOpacity={0.7} activeOpacity={0.8} {...props} style={styles.button}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {},
    buttonLabel: {}
};