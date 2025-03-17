import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ResourceManagementScreen from '../screens/ResourceManagementScreen';
import BuildingManagementScreen from '../screens/BuildingManagementScreen';
import GangManagementScreen from '../screens/GangManagementScreen';
import WeaponsShopScreen from '../screens/WeaponsShopScreen';
import BusinessManagementScreen from '../screens/BusinessManagementScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1a1a1a',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#c41e3a',
                tabBarInactiveTintColor: '#888',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Resources" 
                component={ResourceManagementScreen}
                options={{
                    tabBarLabel: 'Resources',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cash" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Buildings" 
                component={BuildingManagementScreen}
                options={{
                    tabBarLabel: 'Buildings',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="office-building" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Gang" 
                component={GangManagementScreen}
                options={{
                    tabBarLabel: 'Gang',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Weapons" 
                component={WeaponsShopScreen}
                options={{
                    tabBarLabel: 'Weapons',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="gun" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Business" 
                component={BusinessManagementScreen}
                options={{
                    tabBarLabel: 'Business',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="briefcase" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#1a1a1a',
        borderTopWidth: 0,
        elevation: 0,
    },
});

export default MainTabNavigator; 