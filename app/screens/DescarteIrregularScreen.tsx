import { useThemeColor } from '@/hooks/useThemeColor';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export function DescarteIrregularScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const router = useRouter();
  const primaryColor = '#39BF24';

  // 📋 FUNÇÃO PARA COPIAR EMAIL
  const copiarEmail = async () => {
    const email = 'faleconosco@orlandia.sp.gov.br';
    
    try {
      await Clipboard.setStringAsync(email);
      
      // 🎉 NOTIFICAÇÃO DE SUCESSO
      if (Platform.OS === 'web') {
        Alert.alert(
          '📋 Email Copiado!', 
          `O email ${email} foi copiado para sua área de transferência!\n\nVocê pode colar em qualquer app de email.`,
          [{ text: '✅ OK', style: 'default' }]
        );
      } else {
        Alert.alert(
          '📋 Email Copiado!', 
          `${email}\n\nCopiado para área de transferência!`,
          [
            { text: '✅ OK', style: 'default' },
            { 
              text: '📧 Abrir Gmail', 
              onPress: () => tentarAbrirGmail(),
              style: 'default'
            }
          ]
        );
      }
    } catch (error) {
      console.error('❌ Erro ao copiar email:', error);
      Alert.alert(
        'Email da Prefeitura', 
        `${email}\n\nCopie manualmente este email!`
      );
    }
  };

  // 📧 FUNÇÃO PARA TENTAR ABRIR GMAIL (MOBILE)
  const tentarAbrirGmail = async () => {
    try {
      const gmailUrl = 'googlegmail://';
      const canOpenGmail = await Linking.canOpenURL(gmailUrl);
      
      if (canOpenGmail) {
        await Linking.openURL(gmailUrl);
      } else {
        // Tenta abrir qualquer app de email
        const emailUrl = 'mailto:';
        await Linking.openURL(emailUrl);
      }
    } catch (error) {
      Alert.alert('Aviso', 'Não foi possível abrir o app de email automaticamente.');
    }
  };

  // 🔗 FUNÇÃO PARA IR PARA CONTATO
  const irParaContato = () => {
    router.push('/contato');
  };

  // 🔗 FUNÇÃO PARA INSTAGRAM DA PREFEITURA
  const abrirInstagramPrefeitura = async () => {
    const url = 'https://www.instagram.com/prefeituramunicipalorlandia/';
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o Instagram da Prefeitura');
    }
  };

  // 🔗 FUNÇÃO PARA LIGAR PREFEITURA
  const ligarPrefeitura = async () => {
    const telefone = 'tel:+551638263600';
    
    try {
      const canOpen = await Linking.canOpenURL(telefone);
      if (canOpen) {
        await Linking.openURL(telefone);
      } else {
        Alert.alert('Telefone da Prefeitura', '(16) 3826-3600\n\nCopie este número para ligar!');
      }
    } catch (error) {
      Alert.alert('Telefone da Prefeitura', '(16) 3826-3600');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* HEADER PRINCIPAL */}
      <View style={[styles.headerCard, { backgroundColor: primaryColor }]}>
        <Text style={styles.headerTitle}>📸 Descarte Irregular</Text>
        <Text style={styles.headerSubtitle}>
          Denuncie descartes irregulares e ajude a manter Orlândia limpa!
        </Text>
      </View>

      {/* INFORMAÇÕES SOBRE CATA GALHO */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
                <Text style={[styles.cardTitle, { color: '#F2C335' }]}>
          🚛 Campanha Cata Galho
        </Text>
        <Text style={[styles.cardText, { color: textColor }]}>
          A Prefeitura de Orlândia realiza a campanha "Cata Galho", passando pelas ruas 
          da cidade para recolher objetos descartados de forma adequada.
        </Text>
        
        <View style={styles.infoList}>
          <Text style={[styles.listItem, { color: textColor }]}>
            • 🗓️ Cronograma semanal por bairros
          </Text>
          <Text style={[styles.listItem, { color: textColor }]}>
            • 🪑 Móveis velhos e objetos grandes
          </Text>
          <Text style={[styles.listItem, { color: textColor }]}>
            • 🌿 Galhos e restos de poda
          </Text>
          <Text style={[styles.listItem, { color: textColor }]}>
            • 🏗️ Entulhos de pequenas reformas
          </Text>
        </View>
        

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#E4405F' }]}
          onPress={abrirInstagramPrefeitura}
        >
          <Text style={styles.actionButtonText}>
            Mais Informações no Instagram da Prefeitura
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.cardTitle, { color: '#9B59B6' }]}>
          🚫 Tipos de Descarte Irregular
        </Text>
        
        <View style={styles.violationGrid}>
          <View style={styles.violationItem}>
            <Text style={styles.violationIcon}>🪑</Text>
            <Text style={[styles.violationText, { color: textColor }]}>
              Móveis na rua fora do dia do Cata Galho
            </Text>
          </View>
          
          <View style={styles.violationItem}>
            <Text style={styles.violationIcon}>🗑️</Text>
            <Text style={[styles.violationText, { color: textColor }]}>
              Lixo doméstico em locais inadequados
            </Text>
          </View>
          
          <View style={styles.violationItem}>
            <Text style={styles.violationIcon}>🏗️</Text>
            <Text style={[styles.violationText, { color: textColor }]}>
              Entulho de construção em vias públicas
            </Text>
          </View>
          
          <View style={styles.violationItem}>
            <Text style={styles.violationIcon}>🌿</Text>
            <Text style={[styles.violationText, { color: textColor }]}>
              Galhos e restos de poda fora do cronograma
            </Text>
          </View>
        </View>
      </View>

      {/* COMO DENUNCIAR */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.cardTitle, { color: '#E74C3C' }]}>
          🚨 Como Denunciar Descarte Irregular
        </Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={[styles.stepText, { color: textColor }]}>
              📷 Tire fotos do descarte irregular
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={[styles.stepText, { color: textColor }]}>
              📍 Anote o endereço exato ou ponto de referência
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={[styles.stepText, { color: textColor }]}>
              📞 Entre em contato pelos canais abaixo
            </Text>
          </View>
        </View>
      </View>

      {/* CANAIS DE DENÚNCIA */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.cardTitle, { color: primaryColor }]}>
          📞 Canais de Denúncia
        </Text>
        
        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: '#3498DB' }]}
          onPress={ligarPrefeitura}
        >
          <Text style={styles.contactIcon}>📞</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Prefeitura de Orlândia</Text>
            <Text style={styles.contactSubtitle}>(16) 3826-3600</Text>
          </View>
        </TouchableOpacity>

        {/* EMAIL - COPIA AUTOMATICAMENTE AO CLICAR */}
        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: '#E67E22' }]}
          onPress={copiarEmail}
        >
          <Text style={styles.contactIcon}>📧</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email da Prefeitura</Text>
            <Text style={styles.contactSubtitle}>faleconosco@orlandia.sp.gov.br</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: '#E4405F' }]}
          onPress={abrirInstagramPrefeitura}
        >
          <Text style={styles.contactIcon}>📷</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Instagram Prefeitura</Text>
            <Text style={styles.contactSubtitle}>@prefeituramunicipalorlandia</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: '#F2C335' }]}
          onPress={irParaContato}
        >
          <Text style={styles.contactIcon}>📝</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Formulário de Contato</Text>
            <Text style={styles.contactSubtitle}>Use nosso formulário completo</Text>
          </View>
        </TouchableOpacity>
      </View>

     

      {/* FUNCIONALIDADE AGORA DISPONÍVEL */}
      <View style={[styles.card, { backgroundColor: '#E8F5E8', borderColor: '#27AE60', borderWidth: 2 }]}>
        <Text style={[styles.cardTitle, { color: '#27AE60' }]}>
          🚀 Funcionalidade Disponível!
        </Text>
        <Text style={[styles.cardText, { color: '#2C3E50' }]}>
          Agora você pode fazer denúncias diretamente pelo app com:
        </Text>
        
        <View style={styles.futureFeatures}>
          <Text style={[styles.futureFeature, { color: '#27AE60' }]}>✅ Câmera integrada</Text>
          <Text style={[styles.futureFeature, { color: '#27AE60' }]}>✅ GPS automático</Text>
          <Text style={[styles.futureFeature, { color: '#27AE60' }]}>✅ Múltiplas fotos</Text>
          <Text style={[styles.futureFeature, { color: '#F39C12' }]}>🚧 Envio para autoridades</Text>
        </View>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#27AE60', marginTop: 15 }]}
          onPress={() => router.push('/denuncia')}
        >
          <Text style={styles.actionButtonText}>
            🚀 Fazer Denúncia Agora!
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerCard: {
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  infoList: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepContainer: {
    marginBottom: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    backgroundColor: '#E74C3C',
    color: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 15,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  violationGrid: {
    gap: 15,
  },
  violationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#9B59B6',
  },
  violationIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  violationText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
  futureFeatures: {
    marginTop: 15,
  },
  futureFeature: {
    fontSize: 15,
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default DescarteIrregularScreen;

