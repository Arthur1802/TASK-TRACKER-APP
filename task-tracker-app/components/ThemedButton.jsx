import { StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from './ThemedText'

export function ThemedButton({ type = 'primary', onPress, style, text, loading, ...otherProps }) {

    return (
        <TouchableOpacity
            style = {[ styles.button, styles[type], style ]}
            onPress = { onPress }
        >
            { otherProps.children }
            {
                loading ? (
                    <ActivityIndicator color = '#fff' />
                ) : (
                    <Text
                        type = { 'button' }
                        fontWeight = { 'semibold' }
                        style = {{
                            color: "#fff",
                        }}
                    >
                        { text }
                    </Text>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    primary: {
        backgroundColor: '#0a63ff',
    },
    secondary: {
        backgroundColor: '#a1a1a1',
    },
    dangerButton: {
        backgroundColor: '#ff0a0a',
    },
})