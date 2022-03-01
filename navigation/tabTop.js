import React , { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();

import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import { COLORS, icons, FONTS, SIZES } from '../constants';
import { GET_DATA } from '../screens/ultils/api';
const TabTops = () => {
 const [user, setUser] = useState({});
 useEffect(() => {
     let url = `/user-info.php`;
     GET_DATA(`${url}`).then(res => {
         if(res['success'] == 1){
         console.log(res)
             setUser(res['user'])
         }
      }).catch((error)=>{
         console.log("Api call error");
         alert(error.message);
      });
 }, [])

    return (
        <>
        <View
                style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.padding ,
                    marginHorizontal: SIZES.padding,
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{...FONTS.h2}}>Xin chào!</Text>
                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.FULLNAME}</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                    <View>
                        <Image
                            source={icons.search}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.secondary
                            }}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator
               screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "#f5610a",
                    tabBarInactiveTintColor: "#555",
                    tabBarLabelStyle: {
                      fontSize: 12,
                      textTransform: "none"
                    },
                    tabBarIndicatorStyle: {
                      borderBottomColor: COLORS.primary,
                      borderBottomWidth: 2,
                    },
                  })}
              >
                <Tab.Screen name="Tất cả" component={Home} />
                <Tab.Screen name="Đã duyệt" component={Notification} />
                <Tab.Screen name="Chờ duyệt" component={Profile} />
                <Tab.Screen name="Không duyệt" component={Setting} />
            </Tab.Navigator>
    </>
    )
}

export default TabTops;