import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export interface CardProps {
  id: string;
  name: string;
  imageUrl?: string;
  isFavourite?: boolean;
  backgroundColor?: string | string[];
  onPressFavourite?: (event: GestureResponderEvent) => void;
}

const CardContent: React.FC<CardProps> = ({
  id,
  name,
  imageUrl,
  onPressFavourite,
  isFavourite,
}) => (
  <>
    <TouchableWithoutFeedback onPress={onPressFavourite}>
      <Icon
        name="heart"
        size={20}
        color="#CB2222FF"
        style={styles.favourite}
        solid={isFavourite}
      />
    </TouchableWithoutFeedback>
    <Image source={{uri: imageUrl}} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.number}>{id.padStart(3, '0')}</Text>
  </>
);

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito-Bold',
  },
  number: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Nunito-Regular',
  },
  favourite: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CardContent;
