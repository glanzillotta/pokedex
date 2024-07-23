import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const SearchBar = ({onChange}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Name or number"
          placeholderTextColor="#999"
          onChange={onChange}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Icon name="options" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#666',
    borderRadius: 8,
    padding: 8,
  },
});

export default SearchBar;
