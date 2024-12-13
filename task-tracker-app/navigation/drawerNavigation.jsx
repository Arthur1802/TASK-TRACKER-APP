import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { DrawerContent } from '../components/DrawerContent'

import Home from '../app/screens/index'
import Profile from '../app/screens/profile'
import Settings from '../app/screens/settings'

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName = "home"
            drawerContent = { DrawerContent }
            screenOptions = {{
                headerShown: true,
                headerTitleStyle: { fontFamily: 'poppins-semibold', fontSize: 20 },
                headerTintColor: '#000',
            }}
        >
            <Drawer.Screen
                name = "home"
                component = { Home }
                options = {{
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name = "profile"
                component = { Profile }
                options = {{
                    title: 'Profile',
                }}
            />
            <Drawer.Screen
                name = "settings"
                component = { Settings }
                options = {{
                    title: 'Settings',
                }}
            />
        </Drawer.Navigator>
    )
}