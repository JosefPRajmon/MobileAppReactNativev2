import React, { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import { AppConfig } from '../config/App.config';
import { SET_NOTIFICATION_TOKEN } from '../store/actions/actionTypes';

export default function registerForPushNotifications() {
    const dispatch = useDispatch();
    const { rehydrated } = useSelector((state: any) => state._persist);
    const { modules, gpsNotification, token, settingsChanged } = useSelector((state: any) => state.settings);
    const [registrationComplete, setRegistrationComplete] = React.useState(false);
    const notificationListener = <any>useRef();
    const responseListener = <any>useRef();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    React.useEffect(() => {
        async function register() {
            try {
                if ((!token || settingsChanged)) {
                    registerForPushNotificationsAsync(modules, gpsNotification).then((token: any) => {
                        dispatch({
                            type: SET_NOTIFICATION_TOKEN,
                            payload: token
                        })
                    });
                }

                notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {

                });

                responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
                });

                return () => {
                    Notifications.removeNotificationSubscription(notificationListener);
                    Notifications.removeNotificationSubscription(responseListener);
                };

            } catch (e) {
                console.warn(e);
            } finally {
                setRegistrationComplete(true);
            }
        }

        if (rehydrated) {
            register();
        }
    }, [rehydrated]);

    return registrationComplete;
}

const registerForPushNotificationsAsync = async (modules: any, gpsNotification: any) => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;

        let url = AppConfig.domainUrl + AppConfig.notificationEndpoint;
        url = AppConfig.notificationEndpointTest;

        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    value: token,
                },
                modules: modules,
                gpsNotification: gpsNotification,
                appID: AppConfig.appID
            }),
        }).then((response: any) => {
            console.log("Send token response", response);
        }).catch((err: any) => {
            console.error("Send token err", err);
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}