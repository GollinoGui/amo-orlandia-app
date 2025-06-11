import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import apiService from '../services/apiService';

export function ContatoScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = '#F2C335';
  const cardColor = useThemeColor({}, 'card');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  // ✅ FUNÇÕES DE VALIDAÇÃO UNIVERSAIS
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
    if (!email.trim()) return true; // Email é opcional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  // ✅ HANDLERS UNIVERSAIS
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

  // 🔗 FUNÇÕES DE CONTATO EXTERNO UNIVERSAIS
  const abrirWhatsApp = async () => {
    const numero = '5516991737383';
    const mensagem = 'Olá! Gostaria de entrar em contato com a AMO Orlândia.';
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    
    try {
      console.log('📱 [UNIVERSAL] Abrindo WhatsApp...');
      await Linking.openURL(url);
    } catch (error) {
      console.error('❌ [UNIVERSAL] Erro ao abrir WhatsApp:', error);
      
      if (Platform.OS === 'web') {
        setSucesso('💬 WhatsApp: (16) 99173-7383 - Copie este número!');
        setTimeout(() => setSucesso(''), 5000);
      } else {
        Alert.alert('Erro', 'WhatsApp não instalado. Número: (16) 99173-7383');
      }
    }
  };

  const abrirInstagram = async () => {
    const url = 'https://www.instagram.com/amo.orlandia/';
    
    try {
      console.log('📷 [UNIVERSAL] Abrindo Instagram...');
      await Linking.openURL(url);
    } catch (error) {
      console.error('❌ [UNIVERSAL] Erro ao abrir Instagram:', error);
      
      if (Platform.OS === 'web') {
        setSucesso('📷 Instagram: @amo.orlandia - Acesse manualmente!');
        setTimeout(() => setSucesso(''), 5000);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o Instagram. Procure por: @amo.orlandia');
      }
    }
  };

  // 🚀 SISTEMA DE NOTIFICAÇÃO UNIVERSAL
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

  // 📧 FUNÇÃO DE ENVIO UNIVERSAL
  const handleSubmit = async () => {
    limparMensagens();
    setEnviando(true);
    
    try {
      console.log('=== [UNIVERSAL] VALIDAÇÕES CONTATO ===');

      // Validações
      if (!formData.nome.trim()) {
        mostrarErro('Por favor, preencha seu nome.');
        setEnviando(false);
        return;
      }

      if (!validarNome(formData.nome)) {
        mostrarErro('Nome deve conter apenas letras e ter pelo menos 2 caracteres.');
        setEnviando(false);
        return;
      }

      if (!formData.telefone.trim()) {
        mostrarErro('Por favor, preencha seu telefone.');
        setEnviando(false);
        return;
      }

      if (!validarTelefone(formData.telefone)) {
        mostrarErro('Telefone deve ter 10 ou 11 dígitos. Formato: (16) 99999-9999');
        setEnviando(false);
        return;
      }

      if (formData.email && !validarEmail(formData.email)) {
        mostrarErro('Email inválido. Formato: exemplo@email.com');
        setEnviando(false);
        return;
      }

      if (!formData.mensagem.trim()) {
        mostrarErro('Por favor, escreva sua mensagem.');
        setEnviando(false);
        return;
      }

      if (formData.mensagem.trim().length < 10) {
        mostrarErro('Mensagem deve ter pelo menos 10 caracteres.');
        setEnviando(false);
        return;
      }

      console.log('=== [UNIVERSAL] ENVIANDO CONTATO ===');

      const resultado = await apiService.enviarFormularioContato({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email || undefined,
        mensagem: formData.mensagem
      });

      console.log('📧 [UNIVERSAL] Resultado contato:', resultado);

      if (resultado.success) {
        const mensagemSucesso = 'Sua mensagem foi enviada com sucesso!\n\nEntraremos em contato em breve.';
        mostrarSucesso(mensagemSucesso);
        
        // Se for web, limpar formulário após delay
        if (Platform.OS === 'web') {
          setTimeout(() => {
            limparFormulario();
          }, 5000);
        }
        
      } else {
        mostrarErro(resultado.message);
      }

    } catch (error) {
      console.error('❌ [UNIVERSAL] Erro contato:', error);
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
      mensagem: ''
    });
    limparMensagens();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>📞 Contate-nos</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Estamos sempre atendendo através do nosso formulário de contato. Preencha os dados abaixo e descreva o que você necessita.
        </Text>

        {/* 🔧 SISTEMA DE MENSAGENS UNIVERSAL */}
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

        {/* Botões de contato rápido */}
        <View style={styles.quickContactContainer}>
          <TouchableOpacity
            style={[styles.quickContactButton, { backgroundColor: '#25D366' }]}
            onPress={abrirWhatsApp}
            disabled={enviando}
          >
            <Text style={styles.quickContactIcon}>📱</Text>
            <Text style={styles.quickContactText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickContactButton, { backgroundColor: '#E4405F' }]}
            onPress={abrirInstagram}
            disabled={enviando}
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
          {/* Nome */}
          <Text style={[styles.label, { color: textColor }]}>Nome: *</Text>
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
            <Text style={styles.fieldErrorText}>Nome deve conter apenas letras</Text>
          )}

          {/* Telefone */}
          <Text style={[styles.label, { color: textColor }]}>
            Telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
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
            <Text style={styles.fieldErrorText}>Telefone deve ter 10 ou 11 dígitos</Text>
          )}

          {/* Email */}
          <Text style={[styles.label, { color: textColor }]}>Email (opcional):</Text>
          <TextInput
                        style={[styles.input, { borderColor: primaryColor, color: textColor }]}
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
              {enviando ? 'Enviando... ⏳' : 'Enviar Mensagem ✅'}
            </Text>
          </TouchableOpacity>

          {/* 🔧 INDICADOR DE PLATAFORMA */}
          <View style={styles.platformIndicator}>
            <Text style={[styles.platformText, { color: textColor }]}>
              {Platform.OS === 'web' ? '🌐 Versão Web' : '📱 Versão Mobile'}
            </Text>
          </View>
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
  // 🔧 ESTILOS DE MENSAGENS UNIVERSAIS
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
  // 🔧 INDICADOR DE PLATAFORMA
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

