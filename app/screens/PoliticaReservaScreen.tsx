import { useThemeColor } from '@/hooks/useThemeColor';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import apiService from '../services/apiService'; // 👈 NOVO IMPORT

export function PoliticaReservaScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = '#39BF24';
  const cardColor = useThemeColor({}, 'card');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    telefoneContato: '',
    endereco: '',
    diasEspera: '',
    aptoDoacao: '',
    fotoMovel: null as string | null
  });

  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false); // 👈 NOVO ESTADO

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'Empresa Parceira - Cuidando do meio ambiente',
    'Patrocinador Local - Por uma cidade mais limpa'
  ];

  // ... todas as funções de validação permanecem iguais ...
  const validarNome = (nome: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(nome) && nome.trim().length >= 2;
  };

  const formatarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const validarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length === 10 || numeros.length === 11;
  };

  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  const limitarEndereco = (texto: string) => {
    return texto.slice(0, 200);
  };

  const handleNomeChange = (texto: string) => {
    const textoLimpo = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFormData({...formData, nome: textoLimpo});
    setErro('');
  };

  const handleTelefoneChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefone: telefoneFormatado});
    setErro('');
  };

  const handleTelefoneContatoChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefoneContato: telefoneFormatado});
  };

  const handleEnderecoChange = (texto: string) => {
    const enderecoLimitado = limitarEndereco(texto);
    setFormData({...formData, endereco: enderecoLimitado});
    setErro('');
  };

  // ... todas as funções de foto permanecem iguais ...
  const tirarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        setErro('Precisamos de permissão para acessar a câmera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({...formData, fotoMovel: result.assets[0].uri});
      }
    } catch (error) {
      setErro('Não foi possível tirar a foto. Tente novamente.');
    }
  };

  const escolherFoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        setErro('Precisamos de permissão para acessar a galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({...formData, fotoMovel: result.assets[0].uri});
      }
    } catch (error) {
      setErro('Não foi possível escolher a foto. Tente novamente.');
    }
  };

  const mostrarOpcoesFoto = () => {
    Alert.alert(
      'Adicionar Foto do Móvel',
      'Como você gostaria de adicionar a foto?',
      [
        { text: 'Câmera', onPress: tirarFoto },
        { text: 'Galeria', onPress: escolherFoto },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const removerFoto = () => {
    setFormData({...formData, fotoMovel: null});
  };

  // 🚀 NOVA FUNÇÃO - Enviar para o backend
  const handleSubmit = async () => {
    setErro('');
    setEnviando(true);
    
    try {
      console.log('=== INÍCIO DA VALIDAÇÃO ===');

      // Todas as validações permanecem iguais
      if (!formData.nome.trim()) {
        setErro('Por favor, preencha seu nome.');
        setEnviando(false);
        return;
      }

      if (!validarNome(formData.nome)) {
        setErro('Nome deve conter apenas letras e ter pelo menos 2 caracteres.');
        setEnviando(false);
        return;
      }

      if (!formData.telefone.trim()) {
        setErro('Por favor, preencha seu telefone.');
        setEnviando(false);
        return;
      }

      if (!validarTelefone(formData.telefone)) {
        setErro('Telefone deve ter 10 ou 11 dígitos. Formato: (16) 99999-9999');
        setEnviando(false);
        return;
      }

      if (!formData.endereco.trim()) {
        setErro('Por favor, preencha o endereço.');
        setEnviando(false);
        return;
      }

      if (formData.endereco.trim().length < 10) {
        setErro('Endereço deve ter pelo menos 10 caracteres com detalhes e referências.');
        setEnviando(false);
        return;
      }

      if (!formData.diasEspera) {
        setErro('Por favor, selecione quantos dias você pode esperar.');
        setEnviando(false);
        return;
      }

      if (!formData.aptoDoacao) {
        setErro('Por favor, informe se o objeto está apto para doação.');
        setEnviando(false);
        return;
      }

      console.log('=== ENVIANDO PARA O BACKEND ===');

      // 🚀 ENVIAR PARA O BACKEND
      const resultado = await apiService.enviarFormularioReserva({
        nome: formData.nome,
        telefone: formData.telefone,
        telefoneContato: formData.telefoneContato || undefined,
        endereco: formData.endereco,
        diasEspera: formData.diasEspera,
        aptoDoacao: formData.aptoDoacao,
        fotoMovel: formData.fotoMovel || undefined
      });

      if (resultado.success) {
        // Seleciona patrocinador aleatório para a mensagem
        const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
        
        Alert.alert(
          'Sucesso! ✅',
          `Seu formulário foi enviado com sucesso e foi uma cortesia da ${patrocinadorAleatorio}`,
          [{ text: 'OK', onPress: () => limparFormulario() }]
        );
      } else {
        setErro(`❌ ${resultado.message}`);
      }

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErro('❌ Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      telefone: '',
      telefoneContato: '',
      endereco: '',
      diasEspera: '',
      aptoDoacao: '',
      fotoMovel: null
    });
    setErro('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🪑 Política de Reserva de Móveis</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Se você entrou aqui, é porque tem algum tipo de móvel, objeto ou eletrodoméstico para descartar.
        </Text>
        
        <Text style={[styles.subtitle, { color: textColor }]}>Vamos começar:</Text>

        {/* Mensagem de erro/sucesso */}
        {erro ? (
          <View style={[
            styles.messageContainer, 
            { 
              backgroundColor: erro.includes('SUCESSO') ? '#d4edda' : '#f8d7da',
              borderColor: erro.includes('SUCESSO') ? '#c3e6cb' : '#f5c6cb'
            }
          ]}>
            <Text style={[
              styles.messageText,
              { color: erro.includes('SUCESSO') ? '#155724' : '#721c24' }
            ]}>
              {erro}
            </Text>
          </View>
        ) : null}

        <View style={styles.form}>
          {/* Todos os campos do formulário permanecem iguais... */}
          <Text style={[styles.label, { color: textColor }]}>Seu nome: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.nome}
            onChangeText={handleNomeChange}
            placeholder="Digite seu nome completo"
            placeholderTextColor={textColor + '80'}
            maxLength={50}
            editable={!enviando}
          />
          {formData.nome.length > 0 && !validarNome(formData.nome) && (
            <Text style={styles.errorText}>Nome deve conter apenas letras</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Seu telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefone}
            onChangeText={handleTelefoneChange}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
            maxLength={15}
            editable={!enviando}
          />
          {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
            <Text style={styles.errorText}>Telefone deve ter 10 ou 11 dígitos</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Um telefone de contato, parente ou vizinho: ({contarDigitosTelefone(formData.telefoneContato)}/11)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefoneContato}
            onChangeText={handleTelefoneContatoChange}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
            maxLength={15}
            editable={!enviando}
          />

          <Text style={[styles.label, { color: textColor }]}>
            Endereço exato e referências próximas: * ({formData.endereco.length}/200)
          </Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.endereco}
            onChangeText={handleEnderecoChange}
            placeholder="Rua, número, bairro e pontos de referência (mínimo 10 caracteres)"
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={3}
            maxLength={200}
            editable={!enviando}
          />
          {formData.endereco.length > 0 && formData.endereco.length < 10 && (
            <Text style={styles.errorText}>Endereço deve ter pelo menos 10 caracteres</Text>
          )}

          {/* Campo de Foto */}
          <Text style={[styles.label, { color: textColor }]}>Foto do móvel/objeto (opcional):</Text>
          
          {formData.fotoMovel ? (
            <View style={styles.fotoContainer}>
              <Image source={{ uri: formData.fotoMovel }} style={styles.fotoPreview} />
              <View style={styles.fotoButtons}>
                <TouchableOpacity
                  style={[styles.fotoButton, { backgroundColor: primaryColor }]}
                  onPress={mostrarOpcoesFoto}
                  disabled={enviando}
                >
                  <Text style={styles.fotoButtonText}>📷 Trocar Foto</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.fotoButton, { backgroundColor: '#E74C3C' }]}
                  onPress={removerFoto}
                  disabled={enviando}
                >
                                    <Text style={styles.fotoButtonText}>🗑️ Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.addFotoButton, { borderColor: primaryColor }]}
              onPress={mostrarOpcoesFoto}
              disabled={enviando}
            >
              <Text style={styles.addFotoIcon}>📷</Text>
              <Text style={[styles.addFotoText, { color: textColor }]}>
                Adicionar foto do móvel
              </Text>
              <Text style={[styles.addFotoSubtext, { color: textColor }]}>
                Toque para tirar uma foto ou escolher da galeria
              </Text>
            </TouchableOpacity>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Quantos dias você consegue ficar com esse objeto até a AMO ir retirar? *
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
                onPress={() => {
                  setFormData({...formData, diasEspera: opcao});
                  setErro('');
                }}
                disabled={enviando}
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
            Seu objeto/móvel está apto a ser doado a uma família carente? *
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
                onPress={() => {
                  setFormData({...formData, aptoDoacao: opcao});
                  setErro('');
                }}
                disabled={enviando}
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
            style={[
              styles.submitButton, 
              { 
                backgroundColor: enviando ? '#ccc' : primaryColor,
                opacity: enviando ? 0.7 : 1
              }
            ]}
            onPress={handleSubmit}
            activeOpacity={0.7}
            disabled={enviando}
          >
            <Text style={styles.submitButtonText}>
              {enviando ? 'Enviando... ⏳' : 'Enviar formulário ✅'}
            </Text>
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
  messageContainer: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
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
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  // Estilos para foto
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  fotoPreview: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  fotoButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  fotoButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  fotoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addFotoButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(57, 191, 36, 0.05)',
    marginBottom: 10,
  },
  addFotoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  addFotoText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  addFotoSubtext: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});
