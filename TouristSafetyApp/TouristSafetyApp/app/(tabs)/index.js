import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import KJUR from 'jsrsasign';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// ⚠️ REPLACE WITH YOUR LAPTOP'S LOCAL IP (Use ipconfig/ifconfig)
// Example: 'http://192.168.1.5:3000/api'
const API_URL = 'http://localhost:5000/api'; 

export default function App() {
  const [touristId, setTouristId] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [passport, setPassport] = useState('');
  
  // App State
  const [locationStatus, setLocationStatus] = useState('Waiting...');

  // 1. Check if already registered on startup
  useEffect(() => {
    checkRegistration();
  }, []);

  const checkRegistration = async () => {
    try {
      const id = await AsyncStorage.getItem('touristId');
      const key = await AsyncStorage.getItem('privateKey');
      if (id && key) {
        setTouristId(id);
        setPrivateKey(key);
        startLocationTracking(id, key);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Registration Function
  const handleRegister = async () => {
    if (!fullName || !passport) return Alert.alert("Error", "Fill all fields");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/tourist/register`, {
        fullName,
        passportNumber: passport,
        visitStart: new Date().toISOString(),
        visitEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // +7 days
      });

      const { touristId, privateKey } = res.data;
      
      // Save to device
      await AsyncStorage.setItem('touristId', touristId);
      await AsyncStorage.setItem('privateKey', privateKey);

      setTouristId(touristId);
      setPrivateKey(privateKey);
      startLocationTracking(touristId, privateKey);
      Alert.alert("Success", "Welcome to Smart Tourist Safety!");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 3. Panic Button Function
  const handlePanic = async () => {
    if (!touristId) return;
    
    // Get immediate location
    let loc = await Location.getCurrentPositionAsync({});
    
    try {
      await axios.post(`${API_URL}/alerts/panic`, {
        touristId,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
      Alert.alert("🚨 ALERT SENT", "Authorities have been notified of your location!");
    } catch (err) {
      Alert.alert("Error", "Failed to send panic alert");
    }
  };

  // 4. Background/Interval Location Tracking
  const startLocationTracking = (id, key) => {
    setLocationStatus("Tracking Active");
    
    // Request permissions
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        setLocationStatus("Permission Denied");
        return;
      }

      // Send location every 30 seconds
      const interval = setInterval(async () => {
        try {
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          const payload = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            timestamp: new Date().toISOString()
          };

          // Sign the data (PKI)
          const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
          sig.init(key);
          sig.updateString(JSON.stringify(payload));
          const signature = sig.sign();

          // Send to backend
          await axios.post(`${API_URL}/location/update`, {
            user_id: id,
            payload: payload,
            signature: signature
          });
          console.log("Location sent");
        } catch (e) {
          console.log("Location send error", e);
        }
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    });
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  // REGISTRATION SCREEN
  if (!touristId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tourist Registration</Text>
        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Passport Number" value={passport} onChangeText={setPassport} />
        <Button title="Register & Enter Safe Mode" onPress={handleRegister} />
      </View>
    );
  }

  // DASHBOARD SCREEN
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status: Protected</Text>
        <Text>ID: {touristId.slice(0, 8)}...</Text>
        <Text>GPS: {locationStatus}</Text>
      </View>

      <TouchableOpacity style={styles.panicButton} onPress={handlePanic}>
        <Text style={styles.panicText}>SOS / PANIC</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Press SOS in case of emergency. Authorities will receive your live location immediately.</Text>
      
      <Button title="Logout (Dev Only)" color="gray" onPress={() => AsyncStorage.clear().then(() => setTouristId(null))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 5, backgroundColor: 'white' },
  statusContainer: { marginBottom: 50, alignItems: 'center' },
  statusTitle: { fontSize: 22, color: 'green', fontWeight: 'bold' },
  panicButton: {
    backgroundColor: 'red',
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 10,
    shadowColor: 'red',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  panicText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  hint: { textAlign: 'center', color: '#666', marginBottom: 20 }
});