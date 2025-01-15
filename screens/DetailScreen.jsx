import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import axiosInstance from '../config/axiosInstance';
import { WebView } from 'react-native-webview';

const DetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axiosInstance.get(`/movie/${movieId}`);
                setMovie(response.data);

                const videoResponse = await axiosInstance.get(`/movie/${movieId}/videos`);
                const trailer = videoResponse.data.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (trailer) {
                    setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
                }
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
                {videoUrl && (
                    <WebView
                        source={{ uri: videoUrl }}
                        style={{ width: '100%', height: 250 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                )}
                <Text className="text-white text-3xl font-bold m-4">{movie.title}</Text>
                <View className="flex flex-row gap-4 items-end justify-between w-full px-4">
                    <Text className="text-white text-start text-md">Popularity: {movie.popularity}</Text>
                    <Text className="text-white text-start text-md">{movie.original_language}</Text>
                </View>
                <Text className="text-white text-base m-4">{movie.overview}</Text>
                
                {videoUrl && (
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(`https://www.youtube.com/watch?v=${videoUrl.split('/')[4]}`).catch(err => console.error('Failed to open URL', err));
                        }}
                        className="m-4 bg-red-600 p-4 rounded-full"
                    >
                        <Text className="text-white text-lg font-bold text-center">Tonton</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default DetailScreen;