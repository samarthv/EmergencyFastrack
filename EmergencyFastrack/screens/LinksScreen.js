import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as Location from 'expo-location';

export default function LinksScreen() {
  return (
    <div>
      {loc}
    </div>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const geolocate = async () => {
  let loc = await Location.getCurrentPositionAsync({});
  return loc
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
