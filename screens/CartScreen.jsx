import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Item 1', price: 20, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Item 2', price: 35, image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Item 3', price: 50, image: 'https://via.placeholder.com/100' },
    ]);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <ScrollView className="flex-1 bg-black px-4 py-8">
            <Text className="text-4xl font-bold text-start text-white mb-6">Keranjang</Text>

            {cartItems.length === 0 ? (
                <Text className="text-center text-lg text-gray-500">Keranjang Anda kosong</Text>
            ) : (
                cartItems.map((item) => (
                    <View key={item.id} className="flex-row items-center p-4 bg-black rounded-lg shadow-md mb-4">
                        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg" />
                        <View className="ml-4 flex-1">
                            <Text className="text-lg font-medium text-white">{item.name}</Text>
                            <Text className="text-md text-gray-500">${item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                            <Ionicons name="trash-bin-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))
            )}
            
            <View className="p-4 bg-black rounded-lg shadow-md mt-6">
                <Text className="text-xl font-semibold text-white">Total: ${totalPrice}</Text>
            </View>
            
            <TouchableOpacity className="mt-6 p-4 bg-red-600 rounded-full shadow-md">
                <Text className="text-white text-lg font-bold text-center">Checkout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CartScreen;
