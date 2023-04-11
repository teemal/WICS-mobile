import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState();
  // Create lat/long states?
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      
    };
    getPermissions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const test = "https://yayw3a47malmotovh5isklmvly0pyvaj.lambda-url.us-east-1.on.aws/?lat=" + latitude + "&long=" + longitude;
      // console.log(test);
      const res = await fetch(test)
      const data = await res.text()
      console.log(data)
    }    
    fetchData();
  }, [latitude, longitude]);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
