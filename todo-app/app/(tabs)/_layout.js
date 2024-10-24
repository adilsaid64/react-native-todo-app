import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='home'
                options={{
                    tabBarLabel: "home",
                    tabBarLabelStyle: { color: 'black' },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AntDesign name="home" size={30} color='blue' />
                        ) : (
                            <AntDesign name="home" size={30} color='black' />
                        )
                }}
            />

            <Tabs.Screen
                name='calendar'
                options={{
                    tabBarLabel: "calendar",
                    tabBarLabelStyle: { color: 'black' },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AntDesign name="calendar" size={30} color='blue' />
                        ) : (
                            <AntDesign name="calendar" size={30} color='black' />
                        )
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: "profile",
                    tabBarLabelStyle: { color: 'black' },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AntDesign name="user" size={24} color="blue" />) : (
                            <AntDesign name="user" size={24} color="black" />)
                }}
            />
        </Tabs>
    );
}