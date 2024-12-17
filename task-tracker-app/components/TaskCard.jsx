import { Platform, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'
import { ThemedText as Text } from './ThemedText'
import { SymbolView } from 'expo-symbols'
import Ionicons from '@expo/vector-icons/Ionicons'

export function TaskCard({ task, onPressHeaderRight, onPressHeaderLeft }) {
    const theme = useColorScheme() ?? 'light'

    return (
        <>
            {
                task ? (
                    <View style = {[ styles.taskCard, { backgroundColor: theme === "dark" ? "#232323" : "#ffffff" } ]}>
                        <View style = { styles.taskCardHeader }>
                            <TouchableOpacity
                                onPress = { onPressHeaderLeft }
                            >
                                {
                                    Platform.OS === 'ios' ? (
                                        <SymbolView name = "square" size = {28} tintColor = {theme === "dark" ? "#fff" : "#000"} />
                                    ) : (
                                        <Ionicons name = "square-outline" size = {28} color = {theme === "dark" ? "#fff" : "#000"} />
                                    )

                                }
                            </TouchableOpacity>
                            <Text type = "title" fontWeight = "semibold">Title</Text>
                            <TouchableOpacity
                                onPress = { onPressHeaderRight }
                            >
                                {
                                    Platform.OS === 'ios' ? (
                                        <SymbolView name = "square.and.pencil" size = { 28 } tintColor = {theme === "dark" ? "#fff" : "#000"} />
                                    ) : (
                                        <Ionicons name = "create-outline" size = { 28 } color = {theme === "dark" ? "#fff" : "#000"} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.taskCardContent }>
                            <View style = { styles.taskCardContentRows }>
                                <Text type = "default" fontWeight = "semibold">Created on:</Text>
                                <Text type = "default" fontWeight = "regular">2021-10-10</Text>
                            </View>
                            <View style = { styles.taskCardContentRows }>
                                <Text type = "default" fontWeight = "semibold">Starting on:</Text>
                                <Text type = "default" fontWeight = "regular">2021-10-10</Text>
                            </View>
                            <View style = { styles.taskCardContentRows }>
                                <Text type = "default" fontWeight = "semibold">Due on:</Text>
                                <Text type = "default" fontWeight = "regular">2021-10-10</Text>
                            </View>
                            <View style = { styles.taskCardContentRows }>
                                <Text type = "default" fontWeight = "semibold">Description:</Text>
                                <Text type = "default" fontWeight = "regular">Test description</Text>
                            </View>
                            <View style = {[ styles.taskCardContentRows, { borderBottomWidth: 0} ]}>
                                <Text type = "default" fontWeight = "semibold">Status:</Text>
                                <Text type = "default" fontWeight = "regular">Done</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style = { styles.taskCardOutline }>
                        <View style = { styles.taskCardHeaderOutline }>
                            {
                                Platform.OS === 'ios' ? (
                                    <SymbolView name = "square" size = {28} tintColor = "#ccc" />
                                ) : (
                                    <Ionicons name = "square-outline" size = {28} color = "#ccc" />
                                )
                            }
                            <Text type = "title" fontWeight = "semibold">No tasks</Text>
                            <TouchableOpacity
                                onPress = { onPressHeaderRight }
                            >
                                {
                                    Platform.OS === 'ios' ? (
                                        <SymbolView name = "plus.circle" size = {28} tintColor = {theme === "dark" ? "#fff" : "#000"} />
                                    ) : (
                                        <Ionicons name = "add-circle-outline" size = {28} color = {theme === "dark" ? "#fff" : "#000"} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    taskCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    taskCardOutline: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        borderStyle: 'dashed',
    },
    taskCardHeader: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskCardHeaderOutline: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'dashed',
    },
    taskCardContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
    },
    taskCardContentRows: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
})