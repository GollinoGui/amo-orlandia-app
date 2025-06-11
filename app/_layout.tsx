import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  // Função para criar o botão de voltar customizado
  const createHeaderLeft = () => {
    const router = useRouter();
    return () => (
      <TouchableOpacity 
        onPress={() => router.push('/')}
        style={{ 
          marginLeft: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.18)',
          borderRadius: 40,
          width: 50,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        activeOpacity={0.7}
      >
        <Text style={{ 
          color: '#fff', 
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 20,
          marginLeft: 4 // Pequeno ajuste para centralizar melhor
        }}>←</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="quem-somos" 
          options={{ 
            title: 'Quem Somos',
            headerStyle: { backgroundColor: '#39BF24' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="o-que-fazemos" 
          options={{ 
            title: 'O que Fazemos',
            headerStyle: { backgroundColor: '#72BF24' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="atuacao-amo" 
          options={{ 
            title: 'Atuação da AMO',
            headerStyle: { backgroundColor: '#F2C335' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="politica-reserva" 
          options={{ 
            title: 'Política de Reserva',
            headerStyle: { backgroundColor: '#72BF24' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="projeto-limpai" 
          options={{ 
            title: 'Projeto Limpai',
            headerStyle: { backgroundColor: '#9EBF26' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="contato" 
          options={{ 
            title: 'Contate-nos',
            headerStyle: { backgroundColor: '#F2C335' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="descarte-irregular" 
          options={{ 
            title: 'Descarte Irregular',
            headerStyle: { backgroundColor: '#39BF24' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen 
          name="servicos-publicos" 
          options={{ 
            title: 'Serviços Públicos',
            headerStyle: { backgroundColor: '#39BF24' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: createHeaderLeft()
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
