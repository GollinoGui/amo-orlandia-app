import { useThemeColor } from '@/hooks/useThemeColor';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function PoliticaReservaScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = '#39BF24';
  const cardColor = '#ffffff';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('error');

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'UNIMED - Cuidando do meio ambiente',
    'INTELLI - Por uma cidade mais limpa'
  ];

  // Função para mostrar modal
  const mostrarModal = (message: string, type: 'success' | 'error') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  // Função para fechar modal
  const fecharModal = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      limparFormulario();
    }
  };

  // Validação de nome (apenas letras e espaços)
  const validarNome = (nome: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(nome) && nome.trim().length >= 2;
  };

  // Formatação de telefone
  const formatarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  // Validação de telefone
  const validarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length === 10 || numeros.length === 11;
  };

  // Contar dígitos do telefone
  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  // Limitação de caracteres para endereço
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

  // Função para tirar foto
  const tirarFoto = async () => {
    try {
      console.log('Tentando tirar foto...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permissão de câmera negada');
        mostrarModal('Precisamos de permissão para acessar a câmera.', 'error');
        return;
      }

      console.log('Permissão de câmera concedida, abrindo câmera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      console.log('Resultado da câmera:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('Foto capturada:', result.assets[0].uri);
        setFormData({...formData, fotoMovel: result.assets[0].uri});
        setErro('');
      }
    } catch (error) {
      console.log('Erro ao tirar foto:', error);
      mostrarModal('Não foi possível tirar a foto. Tente novamente.', 'error');
    }
  };

  // Função para escolher foto da galeria
  const escolherFoto = async () => {
    try {
      console.log('Tentando escolher foto da galeria...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permissão de galeria negada');
        mostrarModal('Precisamos de permissão para acessar a galeria.', 'error');
        return;
      }

      console.log('Permissão de galeria concedida, abrindo galeria...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      console.log('Resultado da galeria:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('Foto selecionada:', result.assets[0].uri);
        setFormData({...formData, fotoMovel: result.assets[0].uri});
        setErro('');
      }
    } catch (error) {
      console.log('Erro ao escolher foto:', error);
      mostrarModal('Não foi possível escolher a foto. Tente novamente.', 'error');
    }
  };

  // Função para mostrar opções de foto
  const mostrarOpcoesFoto = () => {
    console.log('Mostrando opções de foto...');
    
    // Para web, vamos tentar apenas a galeria primeiro
    if (typeof window !== 'undefined') {
      console.log('Ambiente web detectado, usando apenas galeria');
      escolherFoto();
      return;
    }

    // Para mobile, mostra as opções
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

  // Função para remover foto
  const removerFoto = () => {
    console.log('Removendo foto...');
    setFormData({...formData, fotoMovel: null});
  };

  const handleSubmit = () => {
    setErro('');
    
    console.log('=== INÍCIO DA VALIDAÇÃO ===');
    console.log('Nome:', formData.nome);
    console.log('Telefone:', formData.telefone);
    console.log('Endereço:', formData.endereco);
    console.log('Dias espera:', formData.diasEspera);
    console.log('Apto doação:', formData.aptoDoacao);

    // Validação 1: Nome
    if (!formData.nome.trim()) {
      console.log('ERRO: Nome vazio');
      mostrarModal('Por favor, preencha seu nome.', 'error');
      return;
    }

    if (!validarNome(formData.nome)) {
      console.log('ERRO: Nome inválido');
      mostrarModal('Nome deve conter apenas letras e ter pelo menos 2 caracteres.', 'error');
      return;
    }

    // Validação 2: Telefone
    if (!formData.telefone.trim()) {
      console.log('ERRO: Telefone vazio');
      mostrarModal('Por favor, preencha seu telefone.', 'error');
      return;
    }

    if (!validarTelefone(formData.telefone)) {
      console.log('ERRO: Telefone inválido');
      mostrarModal('Telefone deve ter 10 ou 11 dígitos. Formato: (16) 99999-9999', 'error');
      return;
    }

    // Validação 3: Endereço
    if (!formData.endereco.trim()) {
      console.log('ERRO: Endereço vazio');
      mostrarModal('Por favor, preencha o endereço.', 'error');
      return;
    }

    if (formData.endereco.trim().length < 10) {
      console.log('ERRO: Endereço muito curto');
      mostrarModal('Endereço deve ter pelo menos 10 caracteres com detalhes e referências.', 'error');
      return;
    }

    // Validação 4: Dias de espera
    if (!formData.diasEspera) {
      console.log('ERRO: Dias de espera não selecionado');
      mostrarModal('Por favor, selecione quantos dias você pode esperar.', 'error');
      return;
    }

    // Validação 5: Apto para doação
    if (!formData.aptoDoacao) {
      console.log('ERRO: Apto para doação não selecionado');
      mostrarModal('Por favor, informe se o objeto está apto para doação.', 'error');
      return;
    }

    console.log('=== TODAS VALIDAÇÕES PASSARAM ===');

    // Seleciona patrocinador aleatório
    const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
    
    console.log('Patrocinador selecionado:', patrocinadorAleatorio);

    // Mostra modal de sucesso
    mostrarModal(
      `Seu formulário foi enviado com sucesso e foi uma cortesia da ${patrocinadorAleatorio}`,
      'success'
    );
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
    <>
      <ScrollView style={[styles.container, { backgroundColor: backgroundColor || '#f5f5f5' }]}>
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.title, { color: primaryColor }]}>🪑 Política de Reserva de Móveis</Text>
          
          <Text style={[styles.description, { color: '#333' }]}>
            Se você entrou aqui, é porque tem algum tipo de móvel, objeto ou eletrodoméstico para descartar.
          </Text>
          
          <Text style={[styles.subtitle, { color: '#333' }]}>Vamos começar:</Text>

          <View style={styles.form}>
            <Text style={[styles.label, { color: '#333' }]}>Seu nome: *</Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: '#333' }]}
              value={formData.nome}
              onChangeText={handleNomeChange}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#666"
              maxLength={50}
            />
            {formData.nome.length > 0 && !validarNome(formData.nome) && (
              <Text style={styles.errorText}>Nome deve conter apenas letras</Text>
            )}

            <Text style={[styles.label, { color: '#333' }]}>
              Seu telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
            </Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: '#333' }]}
              value={formData.telefone}
              onChangeText={handleTelefoneChange}
              placeholder="(16) 99999-9999"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              maxLength={15}
            />
            {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
              <Text style={styles.errorText}>Telefone deve ter 10 ou 11 dígitos</Text>
            )}

            <Text style={[styles.label, { color: '#333' }]}>
              Um telefone de contato, parente ou vizinho: ({contarDigitosTelefone(formData.telefoneContato)}/11)
            </Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: '#333' }]}
              value={formData.telefoneContato}
              onChangeText={handleTelefoneContatoChange}
              placeholder="(16) 99999-9999"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              maxLength={15}
            />

            <Text style={[styles.label, { color: '#333' }]}>
              Endereço exato e referências próximas: * ({formData.endereco.length}/200)
            </Text>
            <TextInput
              style={[styles.textArea, { borderColor: primaryColor, color: '#333' }]}
              value={formData.endereco}
              onChangeText={handleEnderecoChange}
              placeholder="Rua, número, bairro e pontos de referência (mínimo 10 caracteres)"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              maxLength={200}
            />
            {formData.endereco.length > 0 && formData.endereco.length < 10 && (
                            <Text style={styles.errorText}>Endereço deve ter pelo menos 10 caracteres</Text>
            )}

            {/* Campo de Foto */}
            <Text style={[styles.label, { color: '#333' }]}>Foto do móvel/objeto (opcional):</Text>
            
            {formData.fotoMovel ? (
              <View style={styles.fotoContainer}>
                <Image source={{ uri: formData.fotoMovel }} style={styles.fotoPreview} />
                <View style={styles.fotoButtons}>
                  <TouchableOpacity
                    style={[styles.fotoButton, { backgroundColor: primaryColor }]}
                    onPress={mostrarOpcoesFoto}
                  >
                    <Text style={styles.fotoButtonText}>📷 Trocar Foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.fotoButton, { backgroundColor: '#E74C3C' }]}
                    onPress={removerFoto}
                  >
                    <Text style={styles.fotoButtonText}>🗑️ Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.addFotoButton, { borderColor: primaryColor }]}
                onPress={mostrarOpcoesFoto}
              >
                <Text style={styles.addFotoIcon}>📷</Text>
                <Text style={[styles.addFotoText, { color: '#333' }]}>
                  Adicionar foto do móvel
                </Text>
                <Text style={[styles.addFotoSubtext, { color: '#666' }]}>
                  Toque para tirar uma foto ou escolher da galeria
                </Text>
              </TouchableOpacity>
            )}

            <Text style={[styles.label, { color: '#333' }]}>
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
                >
                  <View style={[
                    styles.radioCircle,
                    { 
                      borderColor: primaryColor,
                      backgroundColor: formData.diasEspera === opcao ? primaryColor : 'transparent'
                    }
                  ]} />
                  <Text style={[styles.radioText, { color: '#333' }]}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: '#333' }]}>
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
                >
                  <View style={[
                    styles.radioCircle,
                    { 
                      borderColor: primaryColor,
                      backgroundColor: formData.aptoDoacao === opcao ? primaryColor : 'transparent'
                    }
                  ]} />
                  <Text style={[styles.radioText, { color: '#333' }]}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.submitButtonText}>Enviar formulário ✅</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Notificação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContainer,
            { backgroundColor: modalType === 'success' ? '#d4edda' : '#f8d7da' }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>
                {modalType === 'success' ? '✅' : '❌'}
              </Text>
              <Text style={[
                styles.modalTitle,
                { color: modalType === 'success' ? '#155724' : '#721c24' }
              ]}>
                {modalType === 'success' ? 'Sucesso!' : 'Atenção!'}
              </Text>
            </View>
            
            <Text style={[
              styles.modalMessage,
              { color: modalType === 'success' ? '#155724' : '#721c24' }
            ]}>
              {modalMessage}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: modalType === 'success' ? '#28a745' : '#dc3545' }
              ]}
              onPress={fecharModal}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
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
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  modalButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
