import * as React from 'react';
import { TextInput, StackNavigator, TouchableOpacity, Text, View, StyleSheet, } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
import call from 'react-native-phone-call';
Geocode.setApiKey('AIzaSyAcnohmySzY0Me649IBXFQok6W-VzLJUDM');

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Emergency Fastrack: What's Your Emergency?
        </Text>
        <TouchableOpacity
          style={styles.customBtnBGFire}
          onPress={() => {
            this.props.navigation.navigate('Fire');
          }}>
          <Text style={styles.customBtnText}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGCrime}
          onPress={() => {
            this.props.navigation.navigate('Crime');
          }}>
          <Text style={styles.customBtnText}>Crime</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMedical}
          onPress={() => {
            this.props.navigation.navigate('Fire');
          }}>
          <Text style={styles.customBtnText}>Medical</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const EmergencyNumber = {
  number: '4156999701',
};

class FireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {
            call(EmergencyNumber);
          }}>
          <Text style={styles.customBtnText}>Call Local Emergency Line</Text>
        </TouchableOpacity>
        <TextInput
          style={{ marginTop: 75, marginHorizontal: 20 }}
          placeholder="Enter your zip code or city"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {
            Geocode.fromAddress(this.state.text).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                alert(lat + ', ' + lng);
                call(EmergencyNumber);
              },
              error => {
                alert('Please enter a location');
              }
            );
          }}>
          <Text style={styles.customBtnText}>Call By Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMap}
          onPress={() => {
            this.props.navigation.navigate('Map');
          }}>
          <Text style={styles.customBtnText}>Go to Map Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class CrimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {
            alert('vyom make it call someone');
          }}>
          <Text style={styles.customBtnText}>Call Local Emergency Line</Text>
        </TouchableOpacity>
        <TextInput
          style={{ marginTop: 75, marginHorizontal: 20 }}
          placeholder="Enter your zip code or city"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.customBtnBGCall}
          onPress={() => {
            alert(this.state.text);
          }}>
          <Text style={styles.customBtnText}>Call By Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBGMap}
          onPress={() => {
            this.props.navigation.navigate('Map');
          }}>
          <Text style={styles.customBtnText}>Go to Map Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const K_WIDTH = 5;
const K_HEIGHT = 5;

const MarkerStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
};

class Marker extends React.Component {
  render() {
    return <Text>TEXT</Text>;
  }
}

class MapScreen extends React.Component {
  static defaultProps = {
    /* pass the current location to the center */
    center: [37, -122],
    zoom: 9,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  markerMaker() {
    let markers = [];
    var hospitals = [
      'Academy, CA Hospital',
      'Adelanto, CA Hospital',
      'Adin, CA Hospital',
      'Advance, CA Hospital',
      'Ager, CA Hospital',
      'Agoura Hills, CA Hospital',
      'Alameda, CA Hospital',
      'Alberhill, CA Hospital',
      'Alhambra, CA Hospital',
      'Alpine, CA Hospital',
      'Alta Vista, CA Hospital',
      'Altadena, CA Hospital',
      'Alturas, CA Hospital',
      'Amsterdam, CA Hospital',
      'Anaheim, CA Hospital',
      'Anderson, CA Hospital',
      'Angels Camp, CA Hospital',
      'Apple Valley.',
      'Aptos, CA Hospital',
      'Arcade, CA Hospital',
      'Arcadia, CA Hospital',
      'Arcata, CA Hospital',
      'Arnold, CA Hospital',
      'Artesia, CA Hospital',
      'Arrowhead Springs.',
      'Arvin, CA Hospital',
      'Atascadero, CA Hospital',
      'Atlas, CA Hospital',
      'Atwater, CA Hospital',
      'Auburn, CA Hospital',
      'Avalon, CA Hospital',
      'Avenal, CA Hospital',
      'Avocado, CA Hospital',
      'Azusa, CA Hospital',
      'Badwater, CA Hospital',
      'Bakersfield, CA Hospital',
      'Baldwin Park, CA Hospital',
      'Banning, CA Hospital',
      'Barstow, CA Hospital',
      'Bath, CA Hospital',
      'Bee Rock, CA Hospital',
      'Bel Air, CA Hospital',
      'Bell, CA Hospital',
      'Bell Gardens, CA Hospital',
      'Bellflower, CA Hospital',
      'Ben Hur, CA Hospital',
      'Benbow, CA Hospital',
      'Benicia, CA Hospital',
      'Berkeley, CA Hospital',
      'Beverly Hills, CA Hospital',
      'Bieber, CA Hospital',
      'Big Bear City.',
      'Big Bear Lake.',
      'Big Bunch, CA Hospital',
      'Big Pine, CA Hospital',
      'Big Sur, CA Hospital',
      'Biggs, CA Hospital',
      'Birds Landing.',
      'Bishop, CA Hospital',
      'Black Point, CA Hospital',
      'Blinzing, CA Hospital',
      'Bliss, CA Hospital',
      'Blue Jay, CA Hospital',
      'Blue Lake, CA Hospital',
      'Blue Tent, CA Hospital',
      'Blythe, CA Hospital',
      'Bodega Bay, CA Hospital',
      'Boiling Point.',
      'Bombay, CA Hospital',
      'Bonita, CA Hospital',
      'Boonville, CA Hospital',
      'Bootjack, CA Hospital',
      'Boron, CA Hospital',
      'Boulder Creek.',
      'Bradbury, CA Hospital',
      'Brawley, CA Hospital',
      'Brea, CA Hospital',
      'Brentwood, CA Hospital',
      'Bridgeport, CA Hospital',
      'Bryn Mawr, CA Hospital',
      'Buena Park, CA Hospital',
      'Buckeye Flat, CA Hospital',
      'Bully Hill, CA Hospital',
      'Bumblebee, CA Hospital',
      'Bummerville, CA Hospital',
      'Burbank, CA Hospital',
      'Burlingame, CA Hospital',
      'Burney, CA Hospital',
      'Burnt Ranch, CA Hospital',
      'Cactus, CA Hospital',
      'Cactus City, CA Hospital',
      'Calabasas, CA Hospital',
      'Calexico, CA Hospital',
      'California City, CA Hospital',
      'Calistoga, CA Hospital',
      'Camarillo, CA Hospital',
      'Cambria, CA Hospital',
      'Campbell, CA Hospital',
      'Canoga Park, CA Hospital',
      'Canyondam, CA Hospital',
      'Capistrano Beach.',
      'Capitola, CA Hospital',
      'Carpinteria, CA Hospital',
      'Card Place, CA Hospital',
      'Carlsbad, CA Hospital',
      'Carmel, CA Hospital',
      'Carmichael, CA Hospital',
      'Carson, CA Hospital',
      'Castaic, CA Hospital',
      'Castro Valley.',
      'Cathedral City.',
      'Catheys Valley., CA Hospital',
      'Cedarpines Park., CA Hospital',
      'Cedarville, CA Hospital',
      'Ceres, CA Hospital',
      'Cerritos, CA Hospital',
      'Challenge, CA Hospital',
      'Chatsworth, CA Hospital',
      'Chester, CA Hospital',
      'Chico, CA Hospital',
      'China Lake, CA Hospital',
      'Chino, CA Hospital',
      'Chiquita, CA Hospital',
      'Chowchilla, CA Hospital',
      'Chula Vista, CA Hospital',
      'Citrus Heights., CA Hospital',
      'Clairemont, CA Hospital',
      'Claremont, CA Hospital',
      'Clearlake, CA Hospital',
      'Clipper Gap, CA Hospital',
      'Cloverdale, CA Hospital',
      'Clovis, CA Hospital',
      'Coachella, CA Hospital',
      'Coalinga, CA Hospital',
      'Coarsegold, CA Hospital',
      'Coffee, CA Hospital',
      'Coffee Creek, CA Hospital',
      'Coleville, CA Hospital',
      'Colfax, CA Hospital',
      'Colton, CA Hospital',
      'Colusa, CA Hospital',
      'Concepcion, CA Hospital',
      'Concord, CA Hospital',
      'Condemned Bar, CA Hospital',
      'Confidence, CA Hospital',
      'Cool, CA Hospital',
      'Copperopolis, CA Hospital',
      'Corcoran, CA Hospital',
      'Corning, CA Hospital',
      'Corona, CA Hospital',
      'Coronado, CA Hospital',
      'Corte Madera, CA Hospital',
      'Costa Mesa, CA Hospital',
      'Cotati, CA Hospital',
      'Cottonwood, CA Hospital',
      'Coulterville, CA Hospital',
      'Covelo, CA Hospital',
      'Covina, CA Hospital',
      'Coyote Wells, CA Hospital',
      'Crescent City, CA Hospital',
      'Crestline, CA Hospital',
      'Crestmore, CA Hospital',
      'Crockett, CA Hospital',
      'Crowley Lake, CA Hospital',
      'Crown Jewel, CA Hospital',
      'Cuba, CA Hospital',
      'Cudahy, CA Hospital',
      'Culver City, CA Hospital',
      'Cupertino, CA Hospital',
      'Cypress, CA Hospital',
      'Daly City, CA Hospital',
      'Dana Point, CA Hospital',
      'Danville, CA Hospital',
      'Davis, CA Hospital',
      'Deadwood, CA Hospital',
      'Del Cerro, CA Hospital',
      'Del Mar, CA Hospital',
      'Del Rosa, CA Hospital',
      'Delano, CA Hospital',
      'Desert Hot Springs., CA Hospital',
      'Desert Relief, CA Hospital',
      'Devil Canyon, CA Hospital',
      'Devils Elbow, CA Hospital',
      'Devore, CA Hospital',
      'Dew Drop, CA Hospital',
      'Diamond Bar, CA Hospital',
      'Diamond Springs., CA Hospital',
      'Dinuba , CA Hospital',
      'Dixieland , CA Hospital',
      'Dixon, CA Hospital',
      'Dog Town, CA Hospital',
      'Doghouse Junction., CA Hospital',
      'Dogtown, CA Hospital',
      'Dollar Point, CA Hospital',
      'Dominguez, CA Hospital',
      'Dorris, CA Hospital',
      'Dos Palos, CA Hospital',
      'Downey, CA Hospital',
      'Downieville, CA Hospital',
      'Drawbridge, CA Hospital',
      'Drum, CA Hospital',
      'Duarte, CA Hospital',
      'Dublin, CA Hospital',
      'Dunmovin, CA Hospital',
      'Dunsmuir, CA Hospital',
      'Eagle Mountain., CA Hospital',
      'Eagle Rock, CA Hospital',
      'Edgemont, CA Hospital',
      'El Cajon, CA Hospital',
      'El Centro, CA Hospital',
      'El Dorado Hills., CA Hospital',
      'El Monte, CA Hospital',
      'El Rio, CA Hospital',
      'El Segundo, CA Hospital',
      'El Toro, CA Hospital',
      'Elk Grove, CA Hospital',
      'Encanto, CA Hospital',
      'Encinitas, CA Hospital',
      'Encino, CA Hospital',
      'Enterprise, CA Hospital',
      'Escalon, CA Hospital',
      'Escondido, CA Hospital',
      'Etna, CA Hospital',
      'Eureka, CA Hospital',
      'Fair Oaks, CA Hospital',
      'Fair Play, CA Hospital',
      'Fairbanks, CA Hospital',
      'Fairfax, CA Hospital',
      'Fairfield, CA Hospital',
      'Fall River Mills., CA Hospital',
      'Fallbrook, CA Hospital',
      'Fallen Leaf, CA Hospital',
      'False Klamath, CA Hospital',
      'Farmersville, CA Hospital',
      'Fawnskin, CA Hospital',
      'Felton, CA Hospital',
      'Ferndale, CA Hospital',
      'Fernwood, CA Hospital',
      'Fickle Hill, CA Hospital',
      'Fiddletown, CA Hospital',
      'Firebaugh, CA Hospital',
      'Firebrick, CA Hospital',
      'Fish Rock, CA Hospital',
      'Five Brooks, CA Hospital',
      'Fizzben Heights., CA Hospital',
      'Flea Valley, CA Hospital',
      'Folsom, CA Hospital',
      'Fontana, CA Hospital',
      'Fort Bidwell, CA Hospital',
      'Fort Bragg, CA Hospital',
      'Fort Dick, CA Hospital',
      'Fort Jones, CA Hospital',
      'Fortuna, CA Hospital',
      'Foster City, CA Hospital',
      'Fountain Valley., CA Hospital',
      'Fowler, CA Hospital',
      'Frazier Park, CA Hospital',
      'Fremont, CA Hospital',
      'Fresno, CA Hospital',
      'Frink, CA Hospital',
      'Fruitland, CA Hospital',
      'Furnace Creek., CA Hospital',
      'Galt, CA Hospital',
      'Garberville, CA Hospital',
      'Garden Grove, CA Hospital',
      'Gardena, CA Hospital',
      'Gas Point, CA Hospital',
      'Gasquet, CA Hospital',
      'Geyserville, CA Hospital',
      'Gilroy, CA Hospital',
      'Glen Avon, CA Hospital',
      'Glendale, CA Hospital',
      'Glendora, CA Hospital',
      'Goat Rock, CA Hospital',
      'Goleta, CA Hospital',
      'Gonzales, CA Hospital',
      'Grabtown, CA Hospital',
      'Granada Hills, CA Hospital',
      'Grantville, CA Hospital',
      'Grass Valley, CA Hospital',
      'Greenfield, CA Hospital',
      'Gridley, CA Hospital',
      'Grossmont, CA Hospital',
      'Gualala, CA Hospital',
      'Guerneville, CA Hospital',
      'Gustine, CA Hospital',
      'Half Moon Bay, CA Hospital',
      'Hallelujah Junction., CA Hospital',
      'Hambone, CA Hospital',
      'Hamburg, CA Hospital',
      'Hanford, CA Hospital',
      'Happy Camp, CA Hospital',
      'Harbison Canyon., CA Hospital',
      'Harbor City, CA Hospital',
      'Harlem Springs, CA Hospital',
      'Hat Creek, CA Hospital',
      'Hawaiian Gardens., CA Hospital',
      'Hawthorne, CA Hospital',
      'Hayward, CA Hospital',
      'Healdsburg, CA Hospital',
      'Hellhole Palms., CA Hospital',
      'Helltown, CA Hospital',
      'Hemet, CA Hospital',
      'Hercules, CA Hospital',
      'Hermosa Beach., CA Hospital',
      'Hershey, CA Hospital',
      'Hesperia, CA Hospital',
      'Hicksville, CA Hospital',
      'Hidden Hills, CA Hospital',
      'Highgrove, CA Hospital',
      'Highland, CA Hospital',
      'Hirschdale, CA Hospital',
      'Hogtown, CA Hospital',
      'Hollister, CA Hospital',
      'Hollywood, CA Hospital',
      'Holtville, CA Hospital',
      'Home Gardens., CA Hospital',
      'Honeydew, CA Hospital',
      'Hooker, CA Hospital',
      'Hopland, CA Hospital',
      'Hornbrook, CA Hospital',
      'Hornitos, CA Hospital',
      'Huntington Beach., CA Hospital',
      'Huron, CA Hospital',
      'Iceland, CA Hospital',
      'Idlewild, CA Hospital',
      'Idria, CA Hospital',
      'Igo, CA Hospital',
      'Illinoistown, CA Hospital',
      'Imperial, CA Hospital',
      'Imperial Beach., CA Hospital',
      'Independence, CA Hospital',
      'Indian Wells, CA Hospital',
      'Indio, CA Hospital',
      'Inglewood, CA Hospital',
      'Inyokern, CA Hospital',
      'Ione, CA Hospital',
      'Iron Horse, CA Hospital',
      'Ironsides, CA Hospital',
      'Irvine, CA Hospital',
      'Irwindale, CA Hospital',
      'Ivanhoe, CA Hospital',
      'Jackson, CA Hospital',
      'Jamestown, CA Hospital',
      'Java, CA Hospital',
      'Jenner, CA Hospital',
      'Jenny Lind, CA Hospital',
      'Jolon, CA Hospital',
      'Joshua Tree, CA Hospital',
      'June Lake, CA Hospital',
      'Jupiter, CA Hospital',
      'Keeler, CA Hospital',
      'Kekawaka, CA Hospital',
      'Kerman, CA Hospital',
      'Kernville, CA Hospital',
      'Khoonkhwuttunne., CA Hospital',
      'Khwunrghunme, CA Hospital',
      'Kilowatt, CA Hospital',
      'King Salmon, CA Hospital',
      'Kings Beach, CA Hospital',
      'Kingsburg, CA Hospital',
      'Klamath, CA Hospital',
      'Klinefelter, CA Hospital',
      'Komandorski Village., CA Hospital',
      'Kunuqug, CA Hospital',
      'La Crescenta., CA Hospital',
      'La Habra, CA Hospital',
      'La Honda, CA Hospital',
      'La Jolla, CA Hospital',
      'La Mesa, CA Hospital',
      'La Mirada, CA Hospital',
      'La Puente, CA Hospital',
      'La Verne, CA Hospital',
      'Laguna Beach, CA Hospital',
      'Lake Arrowhead., CA Hospital',
      'Lake Forest, CA Hospital',
      'Lake Isabella., CA Hospital',
      'Lake of the Pines., CA Hospital',
      'Lake of the Woods., CA Hospital',
      'Lakeland Village., CA Hospital',
      'Lakeport, CA Hospital',
      'Lakeside, CA Hospital',
      'Lakewood, CA Hospital',
      'Lancaster, CA Hospital',
      'Larkspur, CA Hospital',
      'Last Chance, CA Hospital',
      'Lawndale, CA Hospital',
      'Laws, CA Hospital',
      'Lawyers Bar, CA Hospital',
      'Laytonville, CA Hospital',
      'Lee Vining, CA Hospital',
      'Leggett, CA Hospital',
      'Lemon Grove, CA Hospital',
      'Lemoncove, CA Hospital',
      'Lemoore, CA Hospital',
      'Lennox, CA Hospital',
      'Lick, CA Hospital',
      'Likely, CA Hospital',
      'Lincoln, CA Hospital',
      'Lindsay, CA Hospital',
      'Little Lake, CA Hospital',
      'Little Penny, CA Hospital',
      'Live Oak, CA Hospital',
      'Livingston, CA Hospital',
      'Lodi, CA Hospital',
      'Loleta, CA Hospital',
      'Loma Linda, CA Hospital',
      'Lomita, CA Hospital',
      'Lompoc, CA Hospital',
      'London, CA Hospital',
      'Lone Pine, CA Hospital',
      'Long Beach, CA Hospital',
      'Loomis, CA Hospital',
      'Los Alamitos, CA Hospital',
      'Los Altos, CA Hospital',
      'Los Angeles, CA Hospital',
      'Los Banos, CA Hospital',
      'Los Gatos, CA Hospital',
      'Los Serranos., CA Hospital',
      'Loyalton, CA Hospital',
      'Lucerne, CA Hospital',
      'Lucerne Valley., CA Hospital',
      'Luckie Place, CA Hospital',
      'Lumpkin, CA Hospital',
      'Lynwood, CA Hospital',
      'Macdoel, CA Hospital',
      'Madera, CA Hospital',
      'Magnet, CA Hospital',
      'Malibu, CA Hospital',
      'Mammoth Lakes, CA Hospital',
      'Manhattan Beach., CA Hospital',
      'Manlove, CA Hospital',
      'Manteca, CA Hospital',
      'Maricopa, CA Hospital',
      'Marina Del Rey., CA Hospital',
      'Mariposa, CA Hospital',
      'Markleeville, CA Hospital',
      'Mars, CA Hospital',
      'Martinez, CA Hospital',
      'Marysville, CA Hospital',
      'Maxwell, CA Hospital',
      'Maywood',
    ];

    let i;
    for (i = 0; i < 1000; i++) {
      Geocode.fromAddress(hospitals[i]).then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        markers.push(<Marker lat={lat} lng={lng} text={hospitals[i]} tag={View}/>);
      });
    }
    return markers;
  }

  render() {
    return (
      <GoogleMap
        apiKey={'AIzaSyAcnohmySzY0Me649IBXFQok6W-VzLJUDM'}
        center={this.props.center}
        zoom={this.props.zoom}
        tag={View}>
        <Marker lat={37} lng={-122} text={'Our Location'} tag={View}/>
        {this.markerMaker()}
      </GoogleMap>
    );
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
    color: '#fff',
  },
  customBtnBGFire: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30,
  },
  customBtnBGCrime: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30,
  },
  customBtnBGMedical: {
    alignItems: 'center',
    backgroundColor: 'green',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 75,
    marginHorizontal: 30,
  },
  customBtnBGCall: {
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    marginTop: 50,
    marginHorizontal: 30,
  },
  customBtnBGMap: {
    alignItems: 'center',
    backgroundColor: 'gray',
    marginTop: 100,
  },
});

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Fire: { screen: FireScreen },
  Crime: { screen: CrimeScreen },
  Map: { screen: MapScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
