import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemedText as Text } from '../../components/ThemedText'
import { ThemedView as Div } from '../../components/ThemedView'
import { TaskCard } from '../../components/TaskCard'
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import Task from '../../model/Task/Task'

export default function HomeScreen() {
    const theme = useColorScheme() ?? 'light'

    const navigation = useNavigation()

    const [menuViewWidth, setMenuViewWidth] = useState(0)

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout
        setMenuViewWidth(width)
    }
    
    return (
        <Div>
            <View style = { styles.indexContainer }>
                <View>

                </View>

                <View style = {[ styles.menuContainer, { gap: menuViewWidth * 0.1 } ]} onLayout = {handleLayout}>
                    <TouchableOpacity style = {{ width: '45%' }}>
                        <View style = { styles.menuButton }>
                            <View
                                style = {{
                                    height: 50,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: 5,
                                }}
                            >
                                <SymbolView name = "calendar.circle.fill" size = {35} tintColor = "#0a63ff" />
                                <Text type = "default" fontWeight = "semibold">Today</Text>
                            </View>
                            <View
                                style = {{
                                    height: 50,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: 10,
                                }}
                            >
                                <Ionicons name = "chevron-forward" size = {14} color = "#999" />
                                <Text type = "title" fontWeight = "semibold">5</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{ width: '45%' }}>
                        <View style = { styles.menuButton }>
                            <View
                                style = {{
                                    height: 50,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: 5,
                                }}
                            >
                                <SymbolView name = "calendar" size = {28} tintColor = "#0a63ff" />
                                <Text type = "default" fontWeight = "semibold">Scheduled</Text>
                            </View>
                            <View
                                style = {{
                                    height: 50,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: 10,
                                }}
                            >
                                <Ionicons name = "chevron-forward" size = {14} color = "#999" />
                                <Text type = "title" fontWeight = "semibold">4</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style = { styles.taskCardsContainer }>
                    <TouchableOpacity
                        style = {{
                            width: '100%',
                        }}
                        onPress = {() => navigation.navigate('editTask')}
                    >
                        <TaskCard />
                    </TouchableOpacity>
                </View>
            </View>
        </Div>
    )
}

const styles = StyleSheet.create({
    indexContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    taskCardsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        marginVertical: 20,
    },
    menuContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuButton: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
    },
})