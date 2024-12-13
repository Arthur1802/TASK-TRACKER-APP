import { Image, StyleSheet, View } from 'react-native'
import { ThemedText as Text } from '../../components/ThemedText'
import { ThemedView as Div } from '../../components/ThemedView'
import { ThemedButton as Button } from '../../components/ThemedButton'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation()

    return (
        <Div>
            <View style = { styles.welcomeContainer }>
                <Image
                    source = { require('../../assets/images/logo.png') }
                    style = { styles.welcomeLogo }
                />

                <View style = { styles.text }>
                    <Text style = {{
                        textAlign: 'center',
                    }} type = 'title' fontWeight = { 'semibold' }>
                        Welcome to Task Tracker App
                    </Text>

                    <Text style = {{
                        textAlign: 'center',
                    }} type = 'subtitle' fontWeight = { 'regular' }>
                        Manage your tasks efficiently with Task Tracker App
                    </Text>
                </View>

                <Button
                    type = 'primary'
                    text = 'Get Started'
                    onPress = {() => navigation.navigate('login')}
                />
            </View>
        </Div>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        height: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5%',
        paddingTop: '10%',
    },
    welcomeLogo: {
        width: 250,
        height: 250,
    },
    logoLetters: {
        fontSize: 40,
    },
    text: {
        width: '80%',
        display: 'flex',
        gap: 50,
        alignItems: 'center',
        marginBottom: '40%',
    },
})