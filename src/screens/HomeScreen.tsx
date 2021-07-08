import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../navigation/Screens';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={{fontSize: 24, textAlign: 'center', marginTop: 16}}>
        Анимации
      </Text>

      <View style={{paddingHorizontal: 16, marginTop: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate(Screens.BASIC)}>
          <Text>Базовые анимации</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(Screens.PAN)}>
          <Text>Перемещение элемента рукой</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(Screens.SCROLL)}>
          <Text>Анимированный скролл</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
