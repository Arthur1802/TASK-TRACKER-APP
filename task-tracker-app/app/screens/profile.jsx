import { Button, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemedView as Div } from '../../components/ThemedView'
import { ThemedText as Text } from '../../components/ThemedText'

export default function Profile() {
    const navigation = useNavigation()

    return (
        <Div>
            <View>
                <Text>Profile</Text>

                <Button
                    title = "Sign out"
                    onPress = {() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'welcome', params: { from: 'home' } }]
                        })
                    }}
                />
            </View>
        </Div>
    )
}