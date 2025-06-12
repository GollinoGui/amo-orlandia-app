import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function TesteIOS() {
  const testarTouch = () => {
    Alert.alert('✅ Sucesso!', `Touch funcionando no ${Platform.OS}!`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 30 }}>🧪 Teste iOS</Text>
      
      <TouchableOpacity
        onPress={testarTouch}
        style={{
          backgroundColor: '#39BF24',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessible={true}
        accessibilityLabel="Botão de teste"
        accessibilityRole="button"
      >
        <Text style={{ color: 'white', fontSize: 18 }}>🔘 Clique aqui</Text>
      </TouchableOpacity>
      
      <Text style={{ textAlign: 'center', color: '#666' }}>
        Plataforma: {Platform.OS}{'\n'}
        Se conseguir clicar, o touch está OK!
      </Text>
    </View>
  );
}
