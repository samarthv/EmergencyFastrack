import * as React from 'react';
import { TextInput, StackNavigator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Emergency Fastrack: What's Your Emergency?
        </Text>
        <TouchableOpacity
          style={styles.customBtnBGFire}
          onPress={() => {this.props.navigation.navigate('Fire')}} 
        >
          <Text style={styles.customBtnText}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGCrime}
          onPress={() => {this.props.navigation.navigate('Crime')}} 
        >
          <Text style={styles.customBtnText}>Crime</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMedical}
          onPress={() => {this.props.navigation.navigate('Fire')}} 
        >
          <Text style={styles.customBtnText}>Medical</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class FireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }  
  render() {
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
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {alert(this.state.text)}}
        >
          <Text style={styles.customBtnText}>Call By Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMap}
          onPress={() => {this.props.navigation.navigate('Map')}}
        >
          <Text style={styles.customBtnText}>Go to Map Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class CrimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }  
  render() {
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
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {alert(this.state.text)}}
        >
          <Text style={styles.customBtnText}>Call By Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMap}
          onPress={() => {this.props.navigation.navigate('Map')}}
        >
          <Text style={styles.customBtnText}>Go to Map Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Jordan's Map Screen
        </Text>
      </View>
    )
  }
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
  Home: {screen: HomeScreen},
  Fire: {screen: FireScreen},
  Crime: {screen: CrimeScreen},
  Map: {screen: MapScreen}
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
