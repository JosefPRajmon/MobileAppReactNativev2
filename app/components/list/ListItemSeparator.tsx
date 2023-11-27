
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../themes';

export const ListItemSeparator = () => {
    return (
        <View
            style={styles.separator}
        />
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: Colors.listItemSeparator
    }
});
