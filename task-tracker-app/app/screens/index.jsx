import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemedView as Div } from '../../components/ThemedView'
import { TaskCard } from '../../components/TaskCard'
import { MenuButton } from '../../components/MenuButton'
import TaskDAO from '../../model/Task/TaskDAO'
import { useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen() {
    const taskDAO = useMemo(() => new TaskDAO(), [])

    const [tasks, setTasks] = useState([])

    const navigation = useNavigation()

    const [menuViewWidth, setMenuViewWidth] = useState(0)

    useEffect(() => {
        const fetchTasks = async () => {
            const uid = await AsyncStorage.getItem('uid')

            try {
                const tasks = await taskDAO.getTasksByUser(uid)
                console.log(tasks)
                setTasks(tasks)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [taskDAO, tasks])

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout
        setMenuViewWidth(width)
    }

    const today = new Date().toISOString().split('T')[0]
    const tasksDueToday = tasks.filter(task => task?.dueDate === today).length
    
    return (
        <Div>
            <View style = { styles.indexContainer }>
                {
                    tasks.length > 0 ? (
                    <View style = {[ styles.menuContainer, { gap: menuViewWidth * 0.1 } ]} onLayout = {handleLayout}>
                        { Array.from({ length: tasksDueToday }).map((_, index) => (
                            <MenuButton key = {index} />
                        )) }
                    </View>
                    ) : null
                }

                <View style = { styles.taskCardsContainer }>
                    <TouchableOpacity
                        style = {{
                            width: '100%',
                        }}
                        onPress = {() => navigation.navigate('editTask')}
                    >
                        {
                            tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <TaskCard
                                        task = {task}
                                    />
                                ))
                            ) : (
                                <TaskCard
                                    task = {null}
                                />
                            )
                        }
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