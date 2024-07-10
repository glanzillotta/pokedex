import {StyleSheet, Text} from 'react-native';
import React from 'react';

export default function Title({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
});
