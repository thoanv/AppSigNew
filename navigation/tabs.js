import React from 'react';
import {
    Image, View, Text

} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor : COLORS.white },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.darkgrayText;
                    switch ( route.name ) {
                        case "Home":
                            return (
                                <Image
                                    source={icons.more}
                                    resizeMode="cover"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        // case "Notification":
                        //     return (
                        //         <Image
                        //             source={icons.bell}
                        //             resizeMode="cover"
                        //             style={{
                        //                 tintColor: tintColor,
                        //                 width: 25,
                        //                 height: 25
                        //             }}
                        //         />
                        //     )
            
                        case "Profile":
                            return (
                                <Image
                                    source={icons.user}
                                    resizeMode="cover"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >

            <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
            {/* <Tab.Screen name="Notification" component={Notification} options={{headerShown: false}}/> */}
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default Tabs;