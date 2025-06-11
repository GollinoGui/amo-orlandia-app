import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ServicosPublicosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  const servicos = [
    {
      categoria: '🏥 Saúde',
      cor: '#E74C3C',
      items: [
        { nome: 'UBS Central', telefone: '(16) 3826-1234', endereco: 'Rua das Flores, 123' },
        { nome: 'Hospital Municipal', telefone: '(16) 3826-5678', endereco: 'Av. Principal, 456' },
        { nome: 'SAMU', telefone: '192', endereco: 'Emergências médicas' }
      ]
    },
    {
      categoria: '🚨 Segurança',
      cor: '#3498DB',
      items: [
        { nome: 'Polícia Militar', telefone: '190', endereco: 'Emergências' },
        { nome: 'Polícia Civil', telefone: '(16) 3826-9999', endereco: 'Rua da Segurança, 789' },
        { nome: 'Bombeiros', telefone: '193', endereco: 'Emergências e resgates' }
      ]
    },
    {
      categoria: '🏛️ Prefeitura',
      cor: '#27AE60',
      items: [
        { nome: 'Prefeitura Municipal', telefone: '(16) 3826-1000', endereco: 'Praça Central, 1' },
        { nome: 'Ouvidoria', telefone: '(16) 3826-1001', endereco: 'Reclamações e sugestões' },
        { nome: 'Secretaria de Obras', telefone: '(16) 3826-1002', endereco: 'Infraestrutura urbana' }
      ]
    },
    {
      categoria: '⚡ Utilidades',
      cor: '#F39C12',
      items: [
        { nome: 'CPFL Energia', telefone: '0800-010-1010', endereco: 'Falta de energia' },
        { nome: 'SABESP', telefone: '0800-055-0195', endereco: 'Água e esgoto' },
        { nome: 'Defesa Civil', telefone: '199', endereco: 'Emergências climáticas' }
      ]
    }
  ];

  const ligarPara = (telefone: string) => {
    const numeroLimpo = telefone.replace(/[^\d]/g, '');
    Linking.openURL(`tel:${numeroLimpo}`);
  };

   return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🏥 Serviços Públicos</Text>
        
        <View style={[styles.highlightBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.highlightText, { color: textColor }]}>
            Encontre aqui os principais telefones e informações dos serviços públicos de Orlândia. Toque nos números para ligar diretamente.
          </Text>
        </View>

        {servicos.map((categoria, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={[styles.categoryTitle, { color: categoria.cor }]}>
              {categoria.categoria}
            </Text>
            
            {categoria.items.map((servico, idx) => (
              <View key={idx} style={[styles.serviceCard, { borderLeftColor: categoria.cor }]}>
                <View style={styles.serviceHeader}>
                  <Text style={[styles.serviceName, { color: textColor }]}>
                    {servico.nome}
                  </Text>
                  <TouchableOpacity
                    style={[styles.phoneButton, { backgroundColor: categoria.cor }]}
                    onPress={() => ligarPara(servico.telefone)}
                  >
                    <Text style={styles.phoneButtonText}>📞</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={() => ligarPara(servico.telefone)}>
                  <Text style={[styles.phoneNumber, { color: categoria.cor }]}>
                    {servico.telefone}
                  </Text>
                </TouchableOpacity>
                
                <Text style={[styles.serviceAddress, { color: textColor }]}>
                  📍 {servico.endereco}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={[styles.emergencyBox, { backgroundColor: '#E74C3C' }]}>
          <Text style={styles.emergencyTitle}>🚨 Emergências</Text>
          <View style={styles.emergencyGrid}>
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => ligarPara('190')}
            >
              <Text style={styles.emergencyIcon}>🚔</Text>
              <Text style={styles.emergencyText}>190</Text>
              <Text style={styles.emergencyLabel}>Polícia</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => ligarPara('192')}
            >
              <Text style={styles.emergencyIcon}>🚑</Text>
              <Text style={styles.emergencyText}>192</Text>
              <Text style={styles.emergencyLabel}>SAMU</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => ligarPara('193')}
            >
              <Text style={styles.emergencyIcon}>🚒</Text>
              <Text style={styles.emergencyText}>193</Text>
              <Text style={styles.emergencyLabel}>Bombeiros</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.emergencyButton}
              onPress={() => ligarPara('199')}
            >
              <Text style={styles.emergencyIcon}>🌪️</Text>
              <Text style={styles.emergencyText}>199</Text>
              <Text style={styles.emergencyLabel}>Defesa Civil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoBox, { backgroundColor: primaryColor + '10' }]}>
          <Text style={[styles.infoTitle, { color: primaryColor }]}>ℹ️ Informação Importante</Text>
          <Text style={[styles.infoText, { color: textColor }]}>
            Em caso de problemas com serviços públicos, você também pode entrar em contato com a AMO através do nosso formulário de contato. Ajudamos a encaminhar sua solicitação aos órgãos competentes.
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
  categoryContainer: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  phoneButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneButtonText: {
    fontSize: 18,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceAddress: {
    fontSize: 14,
    opacity: 0.8,
  },
  emergencyBox: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  emergencyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    minWidth: 120,
  },
  emergencyIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  emergencyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  emergencyLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  infoBox: {
    padding: 20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
});
