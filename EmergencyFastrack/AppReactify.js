import React, { useState, useEffect } from 'react';
import { TextInput, StackNavigator, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import $ from 'jquery';

const HomeScreen = ({navigation}) => {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setError('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      getLocationAsync();
    }
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setError('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (location) {
      const lat = JSON.stringify(location.coords.latitude);
      const lon = JSON.stringify(location.coords.longitude);
      setLat(lat);
      setLon(lon);
    }
  };
  let rendLat = <Text>'not found'</Text>
  let rendLon = <Text>not found</Text>
  if (lat != 0) {
    rendLat = <Text>38.0049</Text>
    rendLon = <Text>-121.8058</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Emergency Fastrack: What's Your Emergency?
      </Text>
      {rendLat}
      {rendLon}
      <TouchableOpacity
        style={styles.customBtnBGFire}
        onPress={() => {navigation.navigate('Fire', {
          latitude: 38.0049,
          longitude: -121.8058,
        })}}
      >
        <Text style={styles.customBtnText}>Fire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customBtnBGCrime}
        onPress={() => {navigation.navigate('Crime', {
          latitude: 38.0049,
          longitude: -121.8058,
        })}}
      >
        <Text style={styles.customBtnText}>Crime</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customBtnBGMedical}
        onPress={() => {navigation.navigate('Fire'), {
          latitude: 38.0049,
          longitude: -121.8058,
        }}}
      >
        <Text style={styles.customBtnText}>Medical</Text>
      </TouchableOpacity>
    </View>
  );

};

const FireScreen = ({navigation}) => {

  const [phoneNumber, setNum] = useState('not changed');
  const [zip, setZip] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      console.log("fetching")
      let lat = navigation.getParam('latitude', '')
      let lon = navigation.getParam('longitude', '')
      console.log(lat)
      console.log(lon)
      const response = await fetch(`http://127.0.0.1:5000/receiver?latitude=${lat}&longitude=${lon}}`, {
        method: 'GET'})
      const payload = await response.json();
      console.log(payload)
      setNum(payload.phoneNumber);
    }
    fetchData();
  }, []);
  const rendLat = <Text>{navigation.getParam('latitude', '')}</Text>
  const rendLon = <Text>{navigation.getParam('longitude', '')}</Text>

  const rendNum = <Text>{phoneNumber}</Text>

  return (
    <View style={styles.container}>
      {rendLat}
      {rendLon}
      {rendNum}
      <TouchableOpacity
        style={styles.customBtnBGCall}
        onPress={() => {alert(`${phoneNumber}`)}}>
        <Text style={styles.customBtnText}>Call Local Emergency Line</Text>
      </TouchableOpacity>
      <TextInput
        style={{marginTop: 75, marginHorizontal: 20}}
        placeholder="Enter your zip code or city"
        onChangeText={(text) => setZip(text)}
        value={zip}
      />
      <TouchableOpacity
        style={styles.customBtnBGCall}
        onPress={() => {alert(phoneNumber)}}
      >
        <Text style={styles.customBtnText}>Call By Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customBtnBGMap}
        onPress={() => {navigation.navigate('Map')}}
      >
        <Text style={styles.customBtnText}>Map</Text>
      </TouchableOpacity>
    </View>
  );
};


const CrimeScreen = ({navigation}) => {

  const [phoneNumber, setNum] = useState('not changed');
  const [zip, setZip] = useState('no zip');

  useEffect(() => {

    async function fetchData() {
      try {
        const response = await fetch('/receiver', {
          method: 'GET',
          body: JSON.stringify({
            "latitude": navigation.getParam('latitude', ''),
            "longitude": navigation.getParam('longitude', ''),
          })
        });
        const payload = await response.json();
        setNum(payload.phoneNumber);
      } catch (error) {
        setNum(JSON.stringify(error))
      }
    }
    fetchData();
  }, []);
  const rendLat = <Text>{navigation.getParam('latitude', '')}</Text>
  const rendLon = <Text>{navigation.getParam('longitude', '')}</Text>

  const rendNum = <Text>{phoneNumber}</Text>

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.customBtnBGCall}
        onPress={() => {alert("vyom make it call someone")}}
      >
        <Text style={styles.customBtnText}>Call Local Emergency Line</Text>
      </TouchableOpacity>
      <TextInput
        style={{marginTop: 75, marginHorizontal: 20}}
        placeholder="Enter your zip code or city"
        onChangeText={(text) => setZip({text})}
        value={zip}
      />
      <TouchableOpacity
        style={styles.customBtnBGCall}
        onPress={() => {alert(phoneNumber)}}
      >
        <Text style={styles.customBtnText}>Call By Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customBtnBGMap}
        onPress={() => {navigation.navigate('Map')}}
      >
        <Text style={styles.customBtnText}>Go to Map Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const MapScreen = ({navigation}) =>  {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Jordan's Map Screen
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  paragraph: {
    marginTop: 75,
    color: 'red',
    backgroundColor: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  customBtnText: {
      fontSize: 30,
      fontWeight: '400',
      color: "#fff",
  },
  customBtnBGFire: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30
  },
  customBtnBGCrime: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30
  },
  customBtnBGMedical: {
    alignItems: 'center',
    backgroundColor: 'green',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30
  },
  customBtnBGCall: {
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 50,
    marginHorizontal: 30
  },
  customBtnBGMap: {
    alignItems: 'center',
    backgroundColor: 'gray',
    marginTop: 100
  }
});


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen},
  Fire: {
    screen: FireScreen},
  Crime: {
    screen: CrimeScreen},
  Map: {
    screen: MapScreen}
});

const AppContainer = createAppContainer(AppNavigator);

export default class AppReactify extends React.Component {
  render() {
    return <AppContainer />;
  }
}
