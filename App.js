import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import MainPage from "./MainPage";
import AddReminderScreen from "./AddReminderScreen";
import EditReminderScreen from "./EditReminderScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen"; // Import the ForgotPasswordScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, // Remove headers globally
        }}
      >
        {/* Welcome Screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Sign-In Screen */}
        <Stack.Screen name="SignIn" component={SignInScreen} />

        {/* Sign-Up Screen */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Forgot Password Screen */}
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main Page */}
        <Stack.Screen name="MainPage" component={MainPage} />

        {/* Add Reminder Screen */}
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />

        {/* Edit Reminder Screen */}
        <Stack.Screen name="Edit" component={EditReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
