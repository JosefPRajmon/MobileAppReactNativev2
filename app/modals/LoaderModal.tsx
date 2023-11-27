import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';
export const LoaderModal = (props: any) => {
    const { loading, text, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading} />
                    <Text>{text}</Text>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: "80%",
        height: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
