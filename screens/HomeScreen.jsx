import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import axiosInstance from '../config/axiosInstance';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();
const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [mostViewed, setMostViewed] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {

                const genreResponse = await axiosInstance.get('/genre/movie/list');
                setGenres(genreResponse.data.genres);

                const movies = {};
                await Promise.all(
                    genreResponse.data.genres.map(async (genre) => {
                        const movieResponse = await axiosInstance.get(`/discover/movie?with_genres=${genre.id}`);
                        movies[genre.id] = movieResponse.data.results;
                    })
                );
                setMoviesByGenre(movies);
                
                const mostViewedResponse = await axiosInstance.get('/movie/popular');
                setMostViewed(mostViewedResponse.data.results.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    const renderCarouselItem = ({ item }) => (
        <TouchableOpacity
            className="mr-4 bg-gray-800 rounded-lg overflow-hidden"
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
                style={{ width: screenWidth - 4, height: 400 }}
                className="rounded-lg"
            />
            <View className="absolute bottom-4 left-4 right-4">
                <Text className="text-white text-3xl font-bold">{item.title}</Text>
                <Text className="text-gray-100 text-sm font-regular">{item.overview}</Text>
            </View>
        </TouchableOpacity>


    );

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity
            className="mr-4 bg-gray-800 rounded-lg overflow-hidden"
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="h-56 w-full bg-cover"
            />
            <View className="w-44 px-2 py-2">
                <Text
                    className="text-white text-start text-lg"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderGenreSection = () => (
        genres.map((genre) => (
            <View key={genre.id} className="mb-6">
                <Text className="text-white text-2xl font-bold mx-2 mb-2">{genre.name}</Text>
                <FlatList
                    horizontal
                    data={moviesByGenre[genre.id] || []}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 4 }}
                />
            </View>
        ))
    );

    return (
        <ScrollView className="flex-1 bg-black pt-8">
            <Text className="text-white text-4xl font-bold m-4">Film Terpopuler</Text>
            <FlatList
                data={mostViewed}
                renderItem={renderCarouselItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 0 }}
                snapToAlignment="center"
                decelerationRate="fast"
            />
            
            {renderGenreSection()}
        </ScrollView>
    );
};

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
);

export default HomeStack;
