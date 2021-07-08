import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  // withRepeat,
  // withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const SIZE = 100;

export const BasicAnimationsScreen = () => {
  const navigation = useNavigation();

  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(1);
  const radius = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (radius.value * SIZE) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `${rotate.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  const pressOpacity = () => {
    progress.value = withTiming(0, {duration: 3000});
  };

  const pressScale = () => {
    scale.value = withTiming(2);
  };

  const pressRotate = () => {
    rotate.value = withTiming(2);
  };

  const pressRadius = () => {
    radius.value = withTiming(1);
  };

  const pressCancel = () => {
    progress.value = withTiming(1);
    rotate.value = withTiming(1);
    scale.value = withTiming(1);
    radius.value = withTiming(0);
  };

  // useEffect(() => {
  //   scale.value = withRepeat(withSpring(2), -1, true);
  //   radius.value = withRepeat(withSpring(0.5), -1, true);
  //   rotate.value = withRepeat(withSpring(2), -1, true);
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Назад</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Animated.View
            style={[
              {
                height: SIZE,
                width: SIZE,
                backgroundColor: 'green',
                marginTop: 200,
              },
              reanimatedStyle,
            ]}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => pressOpacity()}>
            <Text>Скрыть</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pressScale()}>
            <Text>Изменить размер</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pressRotate()}>
            <Text>Повернуть</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pressRadius()}>
            <Text>Радиус</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pressCancel()}>
            <Text>Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
