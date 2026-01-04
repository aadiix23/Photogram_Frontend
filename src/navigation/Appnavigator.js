import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import loginScreen from '../screens/authFlow/loginScreen'
import onboardingScreen from "../screens/authFlow/onboardingScreen";
import otpVerificationScreen from "../screens/authFlow/otpVerificationScreen"
import uploadFilesScrren from "../screens/homeScreenFlow/uploadFilesScreen";
import homeScreen from "../screens/homeScreenFlow/homeScreen";
import imageViewScreen from "../screens/homeScreenFlow/imageViewScreen";
import profileScreen from "../screens/homeScreenFlow/profileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setInitialRoute(token ? "homeScreen" : "onboardingScreen");
      } catch (error) {
        setInitialRoute("onboardingScreen");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FDFDFD' }}>
        <ActivityIndicator size="large" color="#6996DE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="loginScreen" component={loginScreen} />
        <Stack.Screen name="onboardingScreen" component={onboardingScreen} />
        <Stack.Screen name="otpVerificationScreen" component={otpVerificationScreen} />
        <Stack.Screen name="uploadFilesScrren" component={uploadFilesScrren} />
        <Stack.Screen name="homeScreen" component={homeScreen} />
        <Stack.Screen name="imageViewScreen" component={imageViewScreen} />
        <Stack.Screen name="profileScreen" component={profileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;