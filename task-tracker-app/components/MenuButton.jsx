import { StyleSheet } from "react-native"
import TaskDAO from "../model/Task/TaskDAO" 

export function menuButton() {
    function TodayTasks() {
        return (
            <TouchableOpacity style = {{ width: '45%' }}>
                <View style = {[ styles.menuButton, { paddingVertical: Platform.OS === 'android' && 15 } ]}>
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
                        {
                            Platform.OS === 'ios' ? (
                                <SymbolView name = "calendar" size = {35} tintColor = "#0a63ff" />
                            ) : (
                                <Ionicons name = "calendar-clear" size = {28} color = "#0a63ff" />
                            )

                        }
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
        )
    }

    function ScheduledTasks() {
        return (
            <TouchableOpacity style = {{ width: '45%' }}>
            <View style = {[ styles.menuButton, { paddingVertical: Platform.OS === 'android' && 15 } ]}>
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
                        {
                            Platform.OS === 'ios' ? (
                                <SymbolView name = "calendar.circle.fill" size = {35} tintColor = "#0a63ff" />
                            ) : (
                                <Ionicons name = "calendar" size = {28} color = "#0a63ff" />
                            )
                        }
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
        )
    }
}

const styles = StyleSheet.create({
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