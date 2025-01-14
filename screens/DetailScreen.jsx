import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axiosInstance from '../config/axiosInstance';

const DetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axiosInstance.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (!movie) return null;

    return (
        <View className="flex flex-1 bg-black pt-8">
            <Text className="text-white text-4xl font-bold m-4">Detail Film</Text>
            <ScrollView>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    className="h-96 w-full"
                />
                <Text className="text-white text-3xl font-bold m-4">{movie.title}</Text>
                <View className="flex flex-row gap-4 items-end justify-between w-full px-4">
                    <Text className="text-white text-start text-md">Popularity: {movie.popularity}</Text>
                    <Text className="text-white text-start text-md">{movie.original_language}</Text>
                </View>
                <Text className="text-white text-base m-4">{movie.overview}</Text>
            </ScrollView>
        </View>
    );
};

export default DetailScreen;
