import {StyleSheet, useWindowDimensions} from 'react-native';
import React, {ReactNode} from 'react';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface SwipeCardProps<T> {
  newData: T[];
  setNewData: React.Dispatch<React.SetStateAction<T[]>>;
  maxVisibleItems: number;
  item: T;
  index: number;
  dataLength: number;
  animatedValue: SharedValue<number>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  renderItems: (item: T) => ReactNode;
}

const SwipeCard = ({
  newData,
  setNewData,
  maxVisibleItems,
  item,
  index,
  dataLength,
  animatedValue,
  currentIndex,
  setCurrentIndex,
  renderItems,
}: SwipeCardProps<any>) => {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  // Define Pan Gesture
  const pan = Gesture.Pan()
    .onUpdate(e => {
      const isSwipeHorizontal =
        Math.abs(e.translationX) > Math.abs(e.translationY);

      if (!isSwipeHorizontal) {
        return;
      } // Ignore vertical gestures

      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1],
        );
      }
    })
    .onEnd(e => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setNewData)([...newData, newData[currentIndex]]);
            runOnJS(setCurrentIndex)(currentIndex + 1);
          });
          animatedValue.value = withTiming(currentIndex + 1);
        } else {
          translateX.value = withTiming(0, {duration: 500});
          animatedValue.value = withTiming(currentIndex, {duration: 500});
        }
      }
    });

  // Use Gesture.Exclusive to manage conflicts
  const exclusiveGesture = Gesture.Exclusive(pan);

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-30, 0],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1],
    );

    return {
      transform: [
        {translateY: currentItem ? 0 : translateY},
        {scale: currentItem ? 1 : scale},
        {translateX: translateX.value},
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg',
        },
      ],
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={exclusiveGesture}>
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: item.backgroundColor, zIndex: dataLength - index},
          animatedStyle,
        ]}>
        {renderItems(item)}
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 360,
    height: 200,
    borderRadius: 28,
    padding: 16,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    width: 80,
    height: 40,
  },
  image: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  middle: {
    flex: 2,
    justifyContent: 'center',
  },
  textNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 56,
  },
});
