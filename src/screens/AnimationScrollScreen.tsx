import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {ScrollItemPage} from '../components/scroll/ScrollItemPage';

const words = ['Добро пожаловать', 'Уважаемый', 'Разработчик', 'React-Native'];

export const AnimationScrollScreen = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      horizontal={true}
      scrollEventThrottle={20}
      style={styles.container}>
      {words.map((item, index) => (
        <View key={index}>
          <ScrollItemPage translateX={translateX} title={item} index={index} />
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
