import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from '../screens/authFlow/loginScreen'
import onboardingScreen from "../screens/authFlow/onboardingScreen";
import otpVerificationScreen from "../screens/authFlow/otpVerificationScreen"
import uploadFilesScrren from "../screens/homeScreenFlow/uploadFilesScreen";
import homeScreen from "../screens/homeScreenFlow/homeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginScreen"
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="loginScreen" component={loginScreen} />
        <Stack.Screen name="onboardingScreen" component={onboardingScreen} />
        <Stack.Screen name="otpVerificationScreen" component={otpVerificationScreen} />
        <Stack.Screen name="uploadFilesScrren" component={uploadFilesScrren} />
        <Stack.Screen name="homeScreen" component={homeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;