import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import MainPage from "./MainPage";
import AddReminderScreen from "./AddReminderScreen";
import EditReminderScreen from "./EditReminderScreen";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} // Hides the header
 />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        <Stack.Screen name="Edit" component={EditReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
