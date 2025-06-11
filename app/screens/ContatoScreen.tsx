import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function ContatoScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });

  const handleSubmit = () => {
    if (!formData.nome || !formData.telefone || !formData.mensagem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    Alert.alert(
      'Sucesso! ✅',
      'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.',
      [{ text: 'OK', onPress: () => limparFormulario() }]
    );
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      mensagem: ''
    });
  };

  const abrirWhatsApp = () => {
    const numero = '5516991737383';
    const mensagem = 'Olá! Gostaria de entrar em contato com a AMO Orlândia.';
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  const abrirInstagram = () => {
    Linking.openURL('https://www.instagram.com/amo.orlandia/');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>📞 Contate-nos</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Estamos sempre atendendo através do nosso formulário de contato. Preencha os dados abaixo e descreva o que você necessita.
        </Text>

        {/* Botões de contato rápido */}
        <View style={styles.quickContactContainer}>
          <TouchableOpacity
            style={[styles.quickContactButton, { backgroundColor: '#25D366' }]}
            onPress={abrirWhatsApp}
          >
            <Text style={styles.quickContactIcon}>📱</Text>
            <Text style={styles.quickContactText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickContactButton, { backgroundColor: '#E4405F' }]}
            onPress={abrirInstagram}
          >
            <Text style={styles.quickContactIcon}>📷</Text>
            <Text style={styles.quickContactText}>Instagram</Text>
          </TouchableOpacity>
        </View>

        {/* Informações de contato */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={[styles.infoText, { color: textColor }]}>
              Av. Cinco, 48 A - Orlândia/SP
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📱</Text>
            <Text style={[styles.infoText, { color: textColor }]}>
              (16) 99173-7383
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📷</Text>
            <Text style={[styles.infoText, { color: textColor }]}>
              @amo.orlandia
            </Text>
          </View>
        </View>

        {/* Formulário */}
        <Text style={[styles.formTitle, { color: primaryColor }]}>📝 Formulário de Contato</Text>

        <View style={styles.form}>
          <Text style={[styles.label, { color: textColor }]}>Nome: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.nome}
            onChangeText={(text) => setFormData({...formData, nome: text})}
            placeholder="Digite seu nome completo"
            placeholderTextColor={textColor + '80'}
          />

          <Text style={[styles.label, { color: textColor }]}>Telefone: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefone}
            onChangeText={(text) => setFormData({...formData, telefone: text})}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: textColor }]}>Email:</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder="seu@email.com"
            placeholderTextColor={textColor + '80'}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: textColor }]}>Mensagem sobre o que você necessita: *</Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.mensagem}
            onChangeText={(text) => setFormData({...formData, mensagem: text})}
            placeholder="Descreva detalhadamente o que você precisa..."
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={5}
          />

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: primaryColor }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Enviar Mensagem ✅</Text>
          </TouchableOpacity>
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
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  quickContactContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  quickContactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  quickContactIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  quickContactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'rgba(57, 191, 36, 0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 25,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
