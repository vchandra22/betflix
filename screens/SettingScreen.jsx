import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
    return (
        <ScrollView className="flex-1 bg-black px-2 py-12">
            <Text className="text-4xl font-bold text-start text-white mb-6">Pengaturan</Text>
            
            <TouchableOpacity
                className="flex-row items-center p-4 bg-black border border-gray-500 rounded-lg shadow-md mb-4"
                onPress={() => alert('Navigasi ke Profil')}
            >
                <Ionicons name="person-circle-outline" size={24} color="white" />
                <Text className="ml-4 text-lg font-medium text-white">Profil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                className="flex-row items-center p-4 bg-black border border-gray-500 rounded-lg shadow-md mb-4"
                onPress={() => alert('Navigasi ke Notifikasi')}
            >
                <MaterialIcons name="notifications" size={24} color="white" />
                <Text className="ml-4 text-lg font-medium text-white">Notifikasi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                className="flex-row items-center p-4 bg-black border border-gray-500 rounded-lg shadow-md mb-4"
                onPress={() => alert('Navigasi ke Privasi')}
            >
                <Ionicons name="shield-checkmark-outline" size={24} color="white" />
                <Text className="ml-4 text-lg font-medium text-white">Privasi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                className="flex-row items-center p-4 bg-black border border-gray-500 rounded-lg shadow-md mb-4"
                onPress={() => alert('Keluar dari aplikasi')}
            >
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text className="ml-4 text-lg font-medium text-white">Keluar</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default SettingsScreen;
