import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Navbar = ({ title, onBack, showBackButton = false }) => {
    return (
        <View className="sticky bottom-0 z-10 bg-gray-900 p-4 flex-row justify-between items-center">
            {showBackButton && (
                <TouchableOpacity onPress={onBack} className="text-white">
                    <Text className="text-white text-lg">←</Text>
                </TouchableOpacity>
            )}
            <Text className="text-white text-xl font-bold">{title}</Text>
            <View className="w-8" />
        </View>
    );
};

export default Navbar;
