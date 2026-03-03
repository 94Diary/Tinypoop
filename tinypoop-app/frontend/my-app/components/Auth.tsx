import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Input } from './UI/Input';
import { Button } from './UI/Button';

// API BASE URL
const API_URL = "http://192.168.1.33:8080"; // Based on your index.tsx

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

export const Auth = ({ onLoginSuccess }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // ตรวจสอบเงื่อนไขตามโหมด Login หรือ Sign Up
    const isInvalid = isLogin 
      ? (!username || !password) 
      : (!username || !email || !password);

    if (isInvalid) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/users/login' : '/users';
      const body = isLogin 
        ? { username, password } 
        : { 
            email, 
            password, 
            username, 
            user_id: `user_${Date.now()}`, 
            uuid: `uuid_${Date.now()}`,
            role: 'user'
          };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        Alert.alert('Success', 'Login successful');
        onLoginSuccess(data.user);
      } else {
        Alert.alert('Success', 'Account created! Please login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6" contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
      <View className="mb-10 items-center">
        <Text className="text-4xl font-black text-blue-600">TinyPoop</Text>
        <Text className="text-gray-500 text-lg mt-2">
          {isLogin ? 'Welcome back!' : 'Join the community'}
        </Text>
      </View>

      <View>
        <Input 
          label="Username" 
          placeholder="Enter your username" 
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        
        {!isLogin && (
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        )}

        <Input 
          label="Password" 
          placeholder="Enter your password" 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button 
          title={loading ? "Please wait..." : (isLogin ? "Login" : "Sign Up")} 
          onPress={handleAuth}
          disabled={loading}
        />

        <TouchableOpacity 
          className="mt-6 items-center" 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text className="text-blue-600 font-semibold">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
