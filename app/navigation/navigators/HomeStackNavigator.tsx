import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { DatabaseProvider } from '../../providers/DatabaseProvider';
import { PrimDataGet } from '../../config/modules/Updater';

interface Props {
}

const Home = createStackNavigator();

function HomeStackNavigator({ }: Props) {
    let db = DatabaseProvider.getInstance()
    db.updateTable({ name: "updates", columns: " (name, value)" })

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
