
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Home';
import AddName from './screens/AddName';
import AddTask from './screens/AddTask';

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AddName" screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddName" component={AddName} />
            <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}