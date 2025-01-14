import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons'; // Ganti dengan library ikon yang Anda gunakan

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Cart') {
                            iconName = 'cart-outline';
                        } else if (route.name === 'Profile') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: { backgroundColor: 'black' }, // Mengatur warna latar belakang tab bar
                    tabBarActiveTintColor: 'white', // Warna ikon/tab aktif
                    tabBarInactiveTintColor: 'gray', // Warna ikon/tab tidak aktif
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
