import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { useLogger } from '@react-navigation/devtools'
import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import Toast from 'react-native-toast-message'
import * as Font from 'expo-font'
import { enableScreens } from 'react-native-screens';
import StackNavigation from '../navigation/stackNavigation'

enableScreens()

const fetchFonts = () => {
    return Font.loadAsync({
        'popping-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    const navigationRef = useNavigationContainerRef()

    useLogger(navigationRef)

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await SplashScreen.preventAutoHideAsync()
                setTimeout(async () => {
                    await fetchFonts()
                }, 2000)
            } catch (e) {
                console.warn(e)
            } finally {
                setIsReady(true)
                SplashScreen.hideAsync()
            }
        };

        prepareApp()
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <>
            <NavigationContainer ref = { navigationRef }>
                <StackNavigation />
            </NavigationContainer>
            <Toast />
        </>
    )
}