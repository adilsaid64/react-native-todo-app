import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
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
