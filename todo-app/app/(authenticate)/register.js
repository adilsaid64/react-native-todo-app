import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';

const register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

    const user = {
      name:name, 
      email:email,
      password:password
    }

    // axios.post("http://localhost:3000/register", (user)).then((response)=>{
    //   console.log(response);
    //   Alert.alert("Registration successfull!")
    // })

  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {/* Title */}
      <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 30 }}>
        Register
      </Text>

        {/* Name Input */}
        <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        
        left={<TextInput.Icon icon="account" />}
        style={{ marginBottom: 20 }}
      />

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        
        left={<TextInput.Icon icon="email" />}
        style={{ marginBottom: 20 }}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        left={<TextInput.Icon icon="lock" />} 
        style={{ marginBottom: 20 }}
      />

      {/* Login Button */}
      <Button mode="contained" onPress={handleRegister} style={{ marginBottom: 20 }}>
        Register
      </Button>

      {/* Register Button */}
      <Button mode="text" onPress={() => router.replace("/login")}>
       Already have an account? Sign in
      </Button>
    </SafeAreaView>
  );
};

export default register;