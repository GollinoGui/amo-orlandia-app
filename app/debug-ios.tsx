import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function DebugIOS() {
  const router = useRouter();
  <TouchableOpacity
  onPress={() => router.push('/debug-ios')}
  style={{
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    🚨 Debug iOS
  </Text>
</TouchableOpacity>
  const testarTouch = () => {
    Alert.alert('🎉 SUCESSO!', 'Touch funcionando no iOS!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#FF6B6B' }}>
        🚨 DEBUG iOS
      </Text>
      
      <TouchableOpacity
        onPress={testarTouch}
        style={{
          backgroundColor: '#FF6B6B',
          padding: 25,
          borderRadius: 15,
          marginBottom: 20,
          width: '80%',
          alignItems: 'center',
        }}
        activeOpacity={0.7}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          🧪 TESTE TOUCH
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/')}
        style={{
          backgroundColor: '#666',
          padding: 15,
          borderRadius: 8,
          width: '60%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 30, textAlign: 'center', color: '#666' }}>
        Plataforma: {Platform.OS}{'\n'}
        Se conseguir clicar, o touch funciona!
      </Text>
    </View>
  );
}
