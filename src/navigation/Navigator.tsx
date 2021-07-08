import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BasicAnimationsScreen} from '../screens/BasicAnimationsScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Screens} from './Screens';
import {PanScreen} from '../screens/PanScreen';
import {AnimationScrollScreen} from '../screens/AnimationScrollScreen';

export const Navigator = () => {
  const Stack = createNativeStackNavigator<any>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.HOME} component={HomeScreen} />
        <Stack.Screen name={Screens.BASIC} component={BasicAnimationsScreen} />
        <Stack.Screen name={Screens.PAN} component={PanScreen} />
        <Stack.Screen name={Screens.SCROLL} component={AnimationScrollScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
