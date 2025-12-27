import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from '../screens/authFlow/loginScreen'
import verificationScreen from '../screens/Auth/verificationScreen'
import onboardingScreen from "../screens/authFlow/onboardingScreen";
import otpVerificationScreen from "../screens/authFlow/otpVerificationScreen"

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="otpVerificationScreen"
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="loginScreen" component={loginScreen} />
        <Stack.Screen name="verificationScreen" component={verificationScreen} />
        <Stack.Screen name="onboardingScreen" component={onboardingScreen} />
        <Stack.Screen name="otpVerificationScreen" component={otpVerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;