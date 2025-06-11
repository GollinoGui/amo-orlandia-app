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
      icon: '🧹',
      title: 'Projeto Limpai',
      description: 'Nossa principal iniciativa de combate ao descarte irregular de resíduos em canteiros centrais e áreas públicas.',
      detalhes: [
        'Mutirões de limpeza regulares',
        'Educação ambiental nas escolas',
        'Palestras em empresas',
        'Mobilização comunitária'
      ]
    },
    {
      icon: '♻️',
      title: 'Política de Reserva de Móveis',
      description: 'Sistema sustentável para descarte responsável de móveis e eletrodomésticos.',
      detalhes: [
        'Coleta programada de móveis',
        'Doação para famílias carentes',
        'Descarte ecológico adequado',
        'Redução do lixo urbano'
      ]
    },
    {
      icon: '👥',
      title: 'Representação Cidadã',
      description: 'Atuamos como ponte entre a população e os órgãos públicos.',
      detalhes: [
        'Fiscalização de serviços públicos',
        'Propostas de melhorias urbanas',
        'Defesa dos direitos dos moradores',
        'Participação em audiências públicas'
      ]
    },
    {
      icon: '🎓',
      title: 'Educação e Conscientização',
      description: 'Promovemos a educação ambiental e cidadã em toda a comunidade.',
      detalhes: [
        'Palestras educativas',
        'Material didático especializado',
        'Campanhas de conscientização',
        'Engajamento de jovens'
      ]
    }
  ];

  const impactos = [
    {
      numero: '500+',
      descricao: 'Famílias atendidas',
      icon: '🏠'
    },
    {
      numero: '50+',
      descricao: 'Mutirões realizados',
      icon: '🧹'
    },
    {
      numero: '1000+',
      descricao: 'Móveis coletados',
      icon: '🪑'
    },
    {
      numero: '20+',
      descricao: 'Escolas visitadas',
      icon: '🏫'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>⚡ O que Fazemos</Text>
        
        <View style={[styles.highlightBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.highlightText, { color: textColor }]}>
            A AMO desenvolve projetos e ações concretas para melhorar a qualidade de vida em Orlândia, sempre com foco na sustentabilidade e participação cidadã.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🚀 Nossas Principais Atividades</Text>
        
        {atividades.map((atividade, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityIcon}>{atividade.icon}</Text>
              <Text style={[styles.activityTitle, { color: textColor }]}>
                {atividade.title}
              </Text>
            </View>
            <Text style={[styles.activityDescription, { color: textColor }]}>
              {atividade.description}
            </Text>
            <View style={styles.detailsList}>
              {atividade.detalhes.map((detalhe, idx) => (
                <Text key={idx} style={[styles.detailItem, { color: textColor }]}>
                  • {detalhe}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📊 Nosso Impacto</Text>
        
        <View style={styles.impactGrid}>
          {impactos.map((impacto, index) => (
            <View key={index} style={[styles.impactCard, { backgroundColor: primaryColor + '10' }]}>
              <Text style={styles.impactIcon}>{impacto.icon}</Text>
              <Text style={[styles.impactNumber, { color: primaryColor }]}>
                {impacto.numero}
              </Text>
              <Text style={[styles.impactDescription, { color: textColor }]}>
                {impacto.descricao}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.callToActionBox, { backgroundColor: primaryColor }]}>
          <Text style={styles.callToActionTitle}>🤝 Faça Parte da Mudança!</Text>
          <Text style={styles.callToActionText}>
            Junte-se à AMO e ajude a construir uma Orlândia melhor para todos. Sua participação faz a diferença!
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
  activityCard: {
    backgroundColor: 'rgba(57, 191, 36, 0.05)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#39BF24',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  activityDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    opacity: 0.9,
  },
  detailsList: {
    marginLeft: 10,
  },
  detailItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    opacity: 0.8,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 25,
  },
  impactCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  impactIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  impactNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  impactDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  callToActionBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  callToActionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  callToActionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
});
