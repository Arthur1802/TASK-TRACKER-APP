import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from '../components/DrawerContent'

import Home from '../app/screens/index'
import Profile from '../app/screens/profile'
import Settings from '../app/screens/settings'
import { useColorScheme } from 'react-native'

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    const theme = useColorScheme() ?? 'light'
    
    return (
        <Drawer.Navigator
            initialRouteName = "home"
            drawerContent = { DrawerContent }
            screenOptions = {{
                headerShown: true,
                headerTitleStyle: { fontFamily: 'poppins-semibold', fontSize: 20 },
                headerTintColor: theme === "dark" ? "#fff" : "#000",
                headerStyle: {
                    backgroundColor: theme === "dark" ? "#000" : "#fff",
                },
                drawerStyle: {
                    backgroundColor: theme === "dark" ? "#000" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                }
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