import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axiosInstance from '../config/axiosInstance';

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get('/movie/popular');
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            className="mx-2 my-4 bg-gray-800 rounded-lg overflow-hidden"
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="h-64 w-full"
            />
            <View className="p-4">
                <Text className="text-white text-start text-4xl mt-2">{item.title}</Text>
                <View className="flex flex-row gap-4 items-end justify-between w-full">
                    <Text className="text-white text-start text-md">Popularity: {item.popularity}</Text>
                    <Text className="text-white text-start text-md">{item.original_language}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View className="flex-1 bg-black pt-8">
            <Text className="text-white text-4xl font-bold m-4">Film Terpopuler</Text>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default HomeScreen;