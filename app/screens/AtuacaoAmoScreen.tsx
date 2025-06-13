import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function AtuacaoAmoScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>💼 Atuação da AMO</Text>
        
        <View style={[styles.highlightBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.highlightText, { color: textColor }]}>
            A AMO atua em toda a cidade de Orlândia, defendendo os interesses dos moradores e promovendo melhorias na qualidade de vida.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📍 Onde Atuamos</Text>
        <View style={styles.locationCard}>
          <Text style={[styles.locationTitle, { color: textColor }]}>🏙️ Abrangência Total</Text>
          <Text style={[styles.locationText, { color: textColor }]}>
            • Todos os bairros de Orlândia/SP{'\n'}
            • Espaços públicos e comunitários{'\n'}
            • Canteiros centrais e praças
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🕐 Horários de Atendimento</Text>
        <View style={styles.scheduleCard}>
          <Text style={[styles.scheduleTitle, { color: textColor }]}>📞 Atendimento Contínuo</Text>
          <Text style={[styles.scheduleText, { color: textColor }]}>
            Estamos sempre disponíveis através do nosso formulário de contato e redes sociais.
          </Text>
          <Text style={[styles.scheduleText, { color: textColor }]}>
            • WhatsApp: (16) 99173-7383{'\n'}
            • Instagram: @amo.orlandia{'\n'}
            • Formulário no app: 24h disponível
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🎯 Áreas de Foco</Text>
        
        <View style={styles.focusArea}>
          <Text style={styles.focusIcon}>🌱</Text>
          <View style={styles.focusContent}>
            <Text style={[styles.focusTitle, { color: textColor }]}>Meio Ambiente</Text>
            <Text style={[styles.focusDescription, { color: textColor }]}>
              Combate ao descarte irregular, preservação de áreas verdes e educação ambiental
            </Text>
          </View>
        </View>

        <View style={styles.focusArea}>
          <Text style={styles.focusIcon}>🏘️</Text>
          <View style={styles.focusContent}>
            <Text style={[styles.focusTitle, { color: textColor }]}>Desenvolvimento Urbano</Text>
            <Text style={[styles.focusDescription, { color: textColor }]}>
              Fiscalização e propostas para melhorias na infraestrutura dos bairros
            </Text>
          </View>
        </View>

        <View style={styles.focusArea}>
          <Text style={styles.focusIcon}>👥</Text>
          <View style={styles.focusContent}>
            <Text style={[styles.focusTitle, { color: textColor }]}>Participação Cidadã</Text>
            <Text style={[styles.focusDescription, { color: textColor }]}>
              Representação da população junto aos órgãos públicos
            </Text>
          </View>
        </View>

        <View style={styles.focusArea}>
          <Text style={styles.focusIcon}>🎓</Text>
          <View style={styles.focusContent}>
            <Text style={[styles.focusTitle, { color: textColor }]}>Educação e Cultura</Text>
            <Text style={[styles.focusDescription, { color: textColor }]}>
              Promoção de atividades educativas, culturais e esportivas
            </Text>
          </View>
        </View>

        <View style={[styles.contactBox, { backgroundColor: primaryColor }]}>
          <Text style={styles.contactTitle}>📍 Nossa Sede</Text>
          <Text style={styles.contactText}>
            Av. Cinco, 48 A{'\n'}
            Orlândia - SP{'\n'}
            CEP: 14.620-000
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 25,
  },
  highlightText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  locationCard: {
    backgroundColor: 'rgba(57, 191, 36, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#39BF24',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 15,
    lineHeight: 22,
  },
  scheduleCard: {
    backgroundColor: 'rgba(114, 191, 36, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#72BF24',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  focusArea: {
    flexDirection: 'row',
    backgroundColor: 'rgba(57, 191, 36, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  focusIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  focusContent: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  focusDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  contactBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
});
// No final do arquivo, adicione:
export default AtuacaoAmoScreen;
