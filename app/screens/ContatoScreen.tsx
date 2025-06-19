import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/apiService';

export function ContatoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  
  // ✅ MANTIVE TODAS AS SUAS VARIÁVEIS ORIGINAIS
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = theme.isDark ? '#FFFFFF' : '#1A1A1A';
  const primaryColor = '#F2C335';
   const cardColor = theme.isDark ? '#2D2D2D' : '#FFFFFF';

  const assuntosFrequentes = [
    "Mal atendimento",
    "Demora no serviço",
    "Dificuldade de acesso",
    "Outro"
  ];

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  // ✅ MANTIVE TODAS AS SUAS FUNÇÕES ORIGINAIS
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

  const validarEmail = (email: string) => {
    if (!email.trim()) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  const limparMensagens = () => {
    setErro('');
    setSucesso('');
  };

  const handleNomeChange = (texto: string) => {
    const textoLimpo = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFormData({...formData, nome: textoLimpo});
    limparMensagens();
  };

  const handleTelefoneChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefone: telefoneFormatado});
    limparMensagens();
  };

  const handleEmailChange = (texto: string) => {
    setFormData({...formData, email: texto.toLowerCase().trim()});
    limparMensagens();
  };

  const handleMensagemChange = (texto: string) => {
    setFormData({...formData, mensagem: texto});
    limparMensagens();
  };

  const abrirWhatsApp = async () => {
    const numero = '5516991737383';
    const mensagem = 'Olá! Gostaria de entrar em contato com a AMO Orlândia.';
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      if (Platform.OS === 'web') {
        setSucesso('💬 WhatsApp: (16) 99173-7383');
        setTimeout(() => setSucesso(''), 5000);
      } else {
        Alert.alert('Erro', 'WhatsApp não instalado. Número: (16) 99173-7383');
      }
    }
  };

  const abrirInstagram = async () => {
    const url = 'https://www.instagram.com/amo.orlandia/';
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      if (Platform.OS === 'web') {
        setSucesso('Instagram: @amo.orlandia');
        setTimeout(() => setSucesso(''), 5000);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o Instagram. Procure: @amo.orlandia');
      }
    }
  };

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'UNIMED - Cuidando do meio ambiente',
    'INTELLI - Por uma cidade mais limpa',
    'ZAP - Tecnologia e Sustentabilidade',
    'BREJEIRO - Cuidando do nosso futuro',
    'OIMASA - Inovação e Sustentabilidade',
    'HOTEL SÃO MARCOS - Conforto e Sustentabilidade',
    'GOLLINO COMERCIAL - Soluções Sustentáveis para Orlândia',
  ];


  const mostrarSucesso = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setSucesso(mensagem);
      setTimeout(() => setSucesso(''), 5000);
    } else {
      Alert.alert('🎉 Sucesso!', mensagem, [
        { text: '✅ OK', onPress: () => limparFormulario() }
      ]);
    }
  };

  const mostrarErro = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setErro(mensagem);
    } else {
      Alert.alert('❌ Erro', mensagem);
    }
  };

  const handleSubmit = async () => {
    limparMensagens();
    setEnviando(true);
    
    try {
      console.log('=== [CONTATO] INICIANDO ENVIO ===');
      console.log('📱 [CONTATO] Plataforma:', Platform.OS);

      // Validações
      if (!formData.nome.trim()) {
        mostrarErro('Por favor, preencha seu nome.');
        return;
      }

      if (!validarNome(formData.nome)) {
        mostrarErro('Nome deve conter apenas letras e ter pelo menos 2 caracteres.');
        return;
      }

      if (!formData.telefone.trim()) {
        mostrarErro('Por favor, preencha seu telefone.');
        return;
      }

      if (!validarTelefone(formData.telefone)) {
        mostrarErro('Telefone deve ter 10 ou 11 dígitos.');
        return;
      }

      if (formData.email && !validarEmail(formData.email)) {
        mostrarErro('Email inválido.');
        return;
      }

      if (!formData.assunto) {
        mostrarErro('Por favor, selecione um assunto.');
        return;
      }

      if (!formData.mensagem.trim()) {
        mostrarErro('Por favor, escreva sua mensagem.');
        return;
      }

      if (formData.mensagem.trim().length < 10) {
        mostrarErro('Mensagem deve ter pelo menos 10 caracteres.');
        return;
      }

      console.log('=== [CONTATO] DADOS VALIDADOS ===');
      console.log('📤 [CONTATO] Enviando:', formData);

      console.log('🧪 [CONTATO] Testando conexão...');
      const conexaoOk = await apiService.testarConexao();
      
      if (!conexaoOk) {
        mostrarErro('Sem conexão com o servidor. Verifique sua internet.');
        return;
      }

      console.log('✅ [CONTATO] Conexão OK, enviando formulário...');

      const resultado = await apiService.enviarFormularioContato({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email || undefined,
        assunto: formData.assunto,
        mensagem: formData.mensagem
      });

      console.log('📧 [CONTATO] Resultado:', resultado);

      if (resultado.success) {
        const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
        const mensagemSucesso = `Sua mensagem foi enviada com sucesso!\n\n Cortesia da:\n${patrocinadorAleatorio}`;
        mostrarSucesso(mensagemSucesso);

        if (Platform.OS === 'web') {
          setTimeout(() => {
            limparFormulario();
          }, 5000);
        }
      } else {
        mostrarErro(resultado.message);
      }

    } catch (error) {
      console.error('❌ [CONTATO] Erro:', error);
      mostrarErro('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      assunto: '',
      mensagem: ''
    });
    limparMensagens();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* ✅ NOVO: STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#F2C335"
      />
      
      {/* ✅ NOVO: HEADER RESPONSIVO */}
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: '#F2C335'
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>📞 Contate-nos</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* CONTEÚDO ORIGINAL (mudança no ScrollView para styles.content) */}
      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.title, { color: primaryColor }]}>Contate-nos</Text>
          <Text style={[styles.description, { color: textColor }]}>
            Estamos sempre atendendo através do nosso formulário de contato.
          </Text>

          {/*  MENSAGENS */}
          {erro ? (
            <View style={[styles.messageContainer, styles.errorContainer]}>
              <Text style={styles.errorMessageText}>❌ {erro}</Text>
            </View>
          ) : null}

          {sucesso ? (
            <View style={[styles.messageContainer, styles.successContainer]}>
              <Text style={styles.successMessageText}>✅ {sucesso}</Text>
            </View>
          ) : null}

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
            {/* Nome */}
            <Text style={[styles.label, { color: textColor }]}>Nome: *</Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: textColor}]}
              value={formData.nome}
              onChangeText={handleNomeChange}
              placeholder="Digite seu nome completo"
              placeholderTextColor={textColor + '80'}
              maxLength={50}
              editable={!enviando}
            />
            {formData.nome.length > 0 && !validarNome(formData.nome) && (
              <Text style={styles.fieldErrorText}>Nome deve conter apenas letras</Text>
            )}

            {/* Telefone */}
            <Text style={[styles.label, { color: textColor }]}>
              Telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
            </Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: textColor}]}
              value={formData.telefone}
              onChangeText={handleTelefoneChange}
              placeholder="(16) 99999-9999"
              placeholderTextColor={textColor + '80'}
              keyboardType="phone-pad"
              maxLength={15}
              editable={!enviando}
            />
            {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
                            <Text style={styles.fieldErrorText}>Telefone deve ter 10 ou 11 dígitos</Text>
            )}

            {/* Email */}
            <Text style={[styles.label, { color: textColor }]}>Email (opcional):</Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: textColor}]}
              value={formData.email}
              onChangeText={handleEmailChange}
              placeholder="seu@email.com"
              placeholderTextColor={textColor + '80'}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!enviando}
            />
            {formData.email.length > 0 && !validarEmail(formData.email) && (
              <Text style={styles.fieldErrorText}>Email inválido</Text>
            )}

            {/* Assunto */}
            <Text style={[styles.label, { color: textColor }]}>Assunto: *</Text>
            {Platform.OS === 'web' ? (
              <select
                value={formData.assunto}
                onChange={e => setFormData({ ...formData, assunto: e.target.value })}
                disabled={enviando}
                style={{
                  marginBottom: 15,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  borderColor: primaryColor,
                  borderWidth: 1,
                  color: textColor,
                  backgroundColor: cardColor,
                }}
              >
                <option value="">Selecione o assunto</option>
                {assuntosFrequentes.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            ) : (
              <Picker
                selectedValue={formData.assunto || ""}
                onValueChange={(itemValue: string) => setFormData({ ...formData, assunto: itemValue || "" })}
                enabled={!enviando}
                style={{
                  marginBottom: 15,
                  backgroundColor: cardColor,
                  borderRadius: 8,
                  color: textColor,
                }}
                itemStyle={{
                  color: textColor,
                }}
              >
                <Picker.Item label="Selecione o assunto" value="" />
                {assuntosFrequentes.map(a => (
                  <Picker.Item key={a} label={a} value={a} />
                ))}
              </Picker>
            )}

            {/* Mensagem */}
            <Text style={[styles.label, { color: textColor }]}>
              Mensagem sobre o que você necessita: * ({formData.mensagem.length}/500)
            </Text>
            <TextInput
              style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
              value={formData.mensagem}
              onChangeText={handleMensagemChange}
              placeholder="Descreva detalhadamente o que você precisa... (mínimo 10 caracteres)"
              placeholderTextColor={textColor + '80'}
              multiline
              numberOfLines={5}
              maxLength={500}
              editable={!enviando}
            />
            {formData.mensagem.length > 0 && formData.mensagem.length < 10 && (
              <Text style={styles.fieldErrorText}>Mensagem deve ter pelo menos 10 caracteres</Text>
            )}

            {/* Botão de envio */}
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
                {enviando ? 'Enviando... ' : 'Enviar Mensagem '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ESPAÇAMENTO FINAL */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ✅ NOVOS ESTILOS PARA O HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
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
  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  successContainer: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  errorMessageText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  successMessageText: {
    color: '#2e7d32',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
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
    backgroundColor: 'rgba(242, 195, 53, 0.1)',
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
    backgroundColor: 'transparent',
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
  fieldErrorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  platformIndicator: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(242, 195, 53, 0.1)',
    borderRadius: 8,
  },
  platformText: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: '500',
  },
});

export default ContatoScreen;

