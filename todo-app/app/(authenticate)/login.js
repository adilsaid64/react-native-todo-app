import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


 useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
    const user = {
      email:email,
      password:password
    }
    axios.post(`${API_URL}/login`, (user)).then((response)=>{
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      router.replace("/(tabs)/home")
    })
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {/* Title */}
      <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 30 }}>
        Login
      </Text>

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        
        left={<TextInput.Icon icon="email" />}  // Material-style icons
        style={{ marginBottom: 20 }}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        left={<TextInput.Icon icon="lock" />}  // Material-style icons
        style={{ marginBottom: 20 }}
      />

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} style={{ marginBottom: 20 }}>
        Login
      </Button>

      {/* Register Button */}
      <Button mode="text" onPress={() => router.replace("/register")}>
        Don't have an account? Register
      </Button>
    </SafeAreaView>
  );
};

export default Login;
