import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ListCard, SearchBar, Title} from '../components';
import React from 'react';

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          ...styles.sectionContainer,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Title>Pokedex</Title>
        <Text style={styles.subTitle}>
          Cerca un pokemon tramite nome o numero del pokedex
        </Text>
        <SearchBar />
        <ListCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    gap: 10,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regualr',
    color: '#333',
  },
});

export default HomeScreen;
