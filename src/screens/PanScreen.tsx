import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const SIZE = 100;

type ContextType = {
  translateX: number;
  translateY: number;
};

export const PanScreen = () => {
  const navigation = useNavigation();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const det = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (det < SIZE * 2 + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const squareStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Назад</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, squareStyle]} />
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 4,
    backgroundColor: 'pink',
  },
  circle: {
    width: SIZE * 4,
    height: SIZE * 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE * 2,
    borderColor: 'pink',
    borderWidth: 3,
  },
});
