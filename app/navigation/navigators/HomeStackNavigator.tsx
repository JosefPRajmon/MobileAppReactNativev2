import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';

interface Props {
}

const Home = createStackNavigator();

function HomeStackNavigator({ }: Props) {

    return (
        <Home.Navigator screenOptions={{
            headerShown: false
        }}>
            <Home.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    ...GlobalNavigationOptions
                }}
            />
        </Home.Navigator>
    );
}

export default HomeStackNavigator;
