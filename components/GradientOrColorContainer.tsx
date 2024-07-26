import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import React from 'react';

interface GradientOrColorContainerProps {
  children: React.ReactNode;
  backgroundColor: string | string[];
  style?: any;
}

function GradientOrColorContainer({
  children,
  backgroundColor,
  style,
}: GradientOrColorContainerProps) {
  return Array.isArray(backgroundColor) ? (
    <LinearGradient
      colors={backgroundColor}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={style}>
      {children}
    </LinearGradient>
  ) : (
    <View style={{...style, backgroundColor}}>{children}</View>
  );
}

export default GradientOrColorContainer;
