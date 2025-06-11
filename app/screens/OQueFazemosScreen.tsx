import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function OQueFazemosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  const atividades = [
    {
      icon: '🌱',
      title: 'Desenvolvimento Sustentável',
      description: 'Promover o desenvolvimento sustentável e equilibrado dos bairros'
    },
    {
      icon: '👥',
      title: 'Representação Popular',
      description: 'Representar a população, propondo soluções a problemas locais e fiscalizando o poder público'
    },
    {
      icon: '🎓',
      title: 'Educação e Cultura',
      description: 'Fomentar cidadania, cultura, educação, esportes e direitos humanos'
    },
    {
      icon: '🌍',
      title: 'Meio Ambiente',
      description: 'Apoiar ações de ética, transparência e preservação do meio ambiente e do patrimônio público'
    },
    {
      icon: '🤝',
      title: 'Políticas Públicas',
      description: 'Colaborar com a formulação de políticas públicas, sem discriminação, fomentando parcerias público-privadas saudáveis'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>⚡ O que Fazemos</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          A AMO é uma entidade apartidária que atua em defesa da qualidade de vida dos cidadãos de Orlândia. Nossas finalidades incluem:
        </Text>

        {atividades.map((atividade, index) => (
          <View key={index} style={styles.atividadeCard}>
            <View style={styles.atividadeHeader}>
              <Text style={styles.atividadeIcon}>{atividade.icon}</Text>
              <Text style={[styles.atividadeTitle, { color: primaryColor }]}>
                {atividade.title}
              </Text>
            </View>
            <Text style={[styles.atividadeDescription, { color: textColor }]}>
              {atividade.description}
            </Text>
          </View>
        ))}

        <View style={[styles.objetivoBox, { borderColor: primaryColor }]}>
          <Text style={[styles.objetivoTitle, { color: primaryColor }]}>🎯 Nossos Objetivos</Text>
          <Text style={[styles.objetivoText, { color: textColor }]}>
            I - Promover o desenvolvimento integral do município, abrangendo todos os seus bairros, de forma equitativa e sustentável;
          </Text>
          <Text style={[styles.objetivoText, { color: textColor }]}>
            II - Colaborar com as autoridades locais, exercendo a função de fiscalizadora, identificando falhas e propondo soluções para os problemas que afetam a qualidade de vida dos cidadãos.
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'justify',
  },
  atividadeCard: {
    backgroundColor: 'rgba(57, 191, 36, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#39BF24',
  },
  atividadeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  atividadeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  atividadeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  atividadeDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 36,
  },
  objetivoBox: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  objetivoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  objetivoText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
});
