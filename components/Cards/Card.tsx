import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardContent, {CardProps} from './CardContent.tsx';

const Card: React.FC<CardProps> = ({
  id,
  name,
  imageUrl,
  onPressFavourite,
  backgroundColor,
  isFavourite = false,
}) => {
  return Array.isArray(backgroundColor) ? (
    <LinearGradient
      colors={backgroundColor}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.card}>
      <CardContent
        id={id}
        name={name}
        imageUrl={imageUrl}
        onPressFavourite={onPressFavourite}
        isFavourite={isFavourite}
      />
    </LinearGradient>
  ) : (
    <View style={{...styles.card, backgroundColor}}>
      <CardContent
        id={id}
        name={name}
        imageUrl={imageUrl}
        onPressFavourite={onPressFavourite}
        isFavourite={isFavourite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
});

export default Card;
