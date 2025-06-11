import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function PoliticaReservaScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    telefoneContato: '',
    endereco: '',
    diasEspera: '',
    aptoDoacao: ''
  });

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'Empresa Parceira - Cuidando do meio ambiente',
    'Patrocinador Local - Por uma cidade mais limpa'
  ];

  const handleSubmit = () => {
    if (!formData.nome || !formData.telefone || !formData.endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
    
    Alert.alert(
      'Sucesso! ✅',
      `Seu formulário foi enviado com sucesso e foi uma cortesia da ${patrocinadorAleatorio}`,
      [{ text: 'OK', onPress: () => limparFormulario() }]
    );
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      telefone: '',
      telefoneContato: '',
      endereco: '',
      diasEspera: '',
      aptoDoacao: ''
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🪑 Política de Reserva de Móveis</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Se você entrou aqui, é porque tem algum tipo de móvel, objeto ou eletrodoméstico para descartar.
        </Text>
        
        <Text style={[styles.subtitle, { color: textColor }]}>Vamos começar:</Text>

        <View style={styles.form}>
          <Text style={[styles.label, { color: textColor }]}>Seu nome: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.nome}
            onChangeText={(text) => setFormData({...formData, nome: text})}
            placeholder="Digite seu nome completo"
            placeholderTextColor={textColor + '80'}
          />

          <Text style={[styles.label, { color: textColor }]}>Seu telefone: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefone}
            onChangeText={(text) => setFormData({...formData, telefone: text})}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: textColor }]}>Um telefone de contato, parente ou vizinho:</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefoneContato}
            onChangeText={(text) => setFormData({...formData, telefoneContato: text})}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: textColor }]}>Endereço exato e referências próximas: *</Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.endereco}
            onChangeText={(text) => setFormData({...formData, endereco: text})}
            placeholder="Rua, número, bairro e pontos de referência"
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={3}
          />

          <Text style={[styles.label, { color: textColor }]}>
            Quantos dias você consegue ficar com esse objeto até a AMO ir retirar?
          </Text>
          <View style={styles.radioGroup}>
            {['02 dias', '03 dias', '01 semana'].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.radioButton,
                  { 
                    borderColor: primaryColor,
                    backgroundColor: formData.diasEspera === opcao ? primaryColor + '20' : 'transparent'
                  }
                ]}
                onPress={() => setFormData({...formData, diasEspera: opcao})}
              >
                <View style={[
                  styles.radioCircle,
                  { 
                    borderColor: primaryColor,
                    backgroundColor: formData.diasEspera === opcao ? primaryColor : 'transparent'
                  }
                ]} />
                <Text style={[styles.radioText, { color: textColor }]}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: textColor }]}>
            Seu objeto/móvel está apto a ser doado a uma família carente?
          </Text>
          <View style={styles.radioGroup}>
            {['Sim', 'Não'].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.radioButton,
                  { 
                    borderColor: primaryColor,
                    backgroundColor: formData.aptoDoacao === opcao ? primaryColor + '20' : 'transparent'
                  }
                ]}
                onPress={() => setFormData({...formData, aptoDoacao: opcao})}
              >
                <View style={[
                  styles.radioCircle,
                  { 
                    borderColor: primaryColor,
                    backgroundColor: formData.aptoDoacao === opcao ? primaryColor : 'transparent'
                  }
                ]} />
                <Text style={[styles.radioText, { color: textColor }]}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: primaryColor }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Enviar formulário ✅</Text>
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
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  radioGroup: {
    gap: 10,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
