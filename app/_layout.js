import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import AppNavigator from "../navigation/AppNavigator";

const App = () => {
    return (
        <SafeAreaView className="flex flex-1 justify-center w-full">
            <AppNavigator />
        </SafeAreaView>
    )
}

export default App;
