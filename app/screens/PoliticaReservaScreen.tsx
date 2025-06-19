// ✅ TEMPLATE PARA COPIAR E COLAR
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/apiService';

export function PoliticaReservaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  
  // ✅ MANTIVE TODAS AS SUAS VARIÁVEIS ORIGINAIS
  const backgroundColor = useThemeColor({}, 'background');
   const textColor = theme.isDark ? '#FFFFFF' : '#1A1A1A';
  const primaryColor = '#39BF24';
  const cardColor = theme.isDark ? '#2D2D2D' : '#FFFFFF';

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
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'UNIMED - Cuidando do meio ambiente',
    'INTELLI - Por uma cidade mais limpa'
  ];

  // ✅ FUNÇÕES DE VALIDAÇÃO (universais)
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

  // ✅ HANDLERS DE INPUT (universais)
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

  const handleTelefoneContatoChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefoneContato: telefoneFormatado});
  };

  const handleEnderecoChange = (texto: string) => {
    const enderecoLimitado = limitarEndereco(texto);
    setFormData({...formData, endereco: enderecoLimitado});
    limparMensagens();
  };

  const limparMensagens = () => {
    setErro('');
    setSucesso('');
  };

  // 🔧 SISTEMA DE FOTO UNIVERSAL (Web + Mobile)
  const escolherFotoWeb = (): Promise<string | null> => {
    return new Promise((resolve) => {
      console.log('🌐 [WEB] Abrindo seletor de arquivo...');
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          console.log('✅ [WEB] Arquivo selecionado:', file.name);
          
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUri = e.target?.result as string;
            console.log('✅ [WEB] Imagem carregada');
            resolve(imageUri);
          };
          reader.onerror = () => {
            console.error('❌ [WEB] Erro ao ler arquivo');
            resolve(null);
          };
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };
      
      input.oncancel = () => {
        console.log('❌ [WEB] Usuário cancelou');
        resolve(null);
      };
      
      input.click();
    });
  };

  const tirarFotoMobile = async (): Promise<string | null> => {
    try {
      console.log('📷 [MOBILE] Abrindo câmera...');
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('✅ [MOBILE] Foto capturada:', imageUri);
        return imageUri;
      }
      
      return null;
    } catch (error) {
      console.error('❌ [MOBILE] Erro ao tirar foto:', error);
      return null;
    }
  };

  const escolherFotoMobile = async (): Promise<string | null> => {
    try {
      console.log('🖼️ [MOBILE] Abrindo galeria...');
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('✅ [MOBILE] Foto escolhida:', imageUri);
        return imageUri;
      }
      
      return null;
    } catch (error) {
      console.error('❌ [MOBILE] Erro ao escolher foto:', error);
      return null;
    }
  };

  // 🎯 FUNÇÃO PRINCIPAL DE FOTO (Universal)
  const adicionarFoto = async () => {
    console.log('🔧 [UNIVERSAL] Platform:', Platform.OS);
    limparMensagens();
    
    try {
      let imageUri: string | null = null;
      
      if (Platform.OS === 'web') {
        // WEB: Apenas galeria
        imageUri = await escolherFotoWeb();
        
      } else {
        // MOBILE: Mostrar opções (Câmera ou Galeria)
        const opcao = await new Promise<'camera' | 'gallery' | null>((resolve) => {
          Alert.alert(
            '📷 Adicionar Foto',
            'Como você gostaria de adicionar a foto?',
            [
              {
                text: ' Câmera',
                onPress: () => resolve('camera')
              },
              {
                text: ' Galeria',
                onPress: () => resolve('gallery')
              },
              {
                text: ' Cancelar',
                style: 'cancel',
                onPress: () => resolve(null)
              }
            ]
          );
        });
        
        if (opcao === 'camera') {
          // Verificar permissão da câmera
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (permission.status === 'granted') {
            imageUri = await tirarFotoMobile();
          } else {
            setErro('❌ Permissão da câmera negada');
            return;
          }
        } else if (opcao === 'gallery') {
          // Verificar permissão da galeria
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (permission.status === 'granted') {
            imageUri = await escolherFotoMobile();
          } else {
            setErro('❌ Permissão da galeria negada');
            return;
          }
        }
      }
      
      // Processar resultado
      if (imageUri) {
        setFormData({...formData, fotoMovel: imageUri});
        setSucesso('✅ Foto adicionada com sucesso!');
        
        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => setSucesso(''), 3000);
      }
      
    } catch (error) {
      console.error('❌ [UNIVERSAL] Erro ao adicionar foto:', error);
      setErro('❌ Erro ao adicionar foto. Tente novamente.');
    }
  };

  const removerFoto = () => {
    console.log('🗑️ [UNIVERSAL] Removendo foto');
    setFormData({...formData, fotoMovel: null});
    setSucesso('🗑️ Foto removida com sucesso!');
    setTimeout(() => setSucesso(''), 2000);
  };

  // 🚀 SISTEMA DE NOTIFICAÇÃO UNIVERSAL
  const mostrarSucesso = (mensagem: string) => {
    if (Platform.OS === 'web') {
      // WEB: Usar estado para mostrar banner
      setSucesso(mensagem);
      setTimeout(() => setSucesso(''), 5000);
    } else {
      // MOBILE: Usar Alert
      Alert.alert('🎉 Sucesso!', mensagem, [
        { text: '✅ OK', onPress: () => limparFormulario() }
      ]);
    }
  };

  const mostrarErro = (mensagem: string) => {
    if (Platform.OS === 'web') {
      // WEB: Usar estado para mostrar banner
      setErro(mensagem);
    } else {
      // MOBILE: Usar Alert
      Alert.alert('❌ Erro', mensagem);
    }
  };

  // 📧 FUNÇÃO DE ENVIO UNIVERSAL
  const handleSubmit = async () => {
    limparMensagens();
    setEnviando(true);
    
    try {
      console.log('=== [UNIVERSAL] VALIDAÇÕES ===');

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

      if (!formData.endereco.trim()) {
        mostrarErro('Por favor, preencha o endereço.');
        setEnviando(false);
        return;
      }

      if (formData.endereco.trim().length < 10) {
        mostrarErro('Endereço deve ter pelo menos 10 caracteres com detalhes e referências.');
        setEnviando(false);
        return;
      }

      if (!formData.diasEspera) {
        mostrarErro('Por favor, selecione quantos dias você pode esperar.');
        setEnviando(false);
        return;
      }

      if (!formData.aptoDoacao) {
        mostrarErro('Por favor, informe se o objeto está apto para doação.');
        setEnviando(false);
        return;
      }

      console.log('=== [UNIVERSAL] ENVIANDO ===');

      const resultado = await apiService.enviarFormularioReserva({
        nome: formData.nome,
        telefone: formData.telefone,
        telefoneContato: formData.telefoneContato || undefined,
        endereco: formData.endereco,
        diasEspera: formData.diasEspera,
        aptoDoacao: formData.aptoDoacao,
        fotoMovel: formData.fotoMovel || undefined
      });

       console.log('📧 [UNIVERSAL] Resultado:', resultado);

      if (resultado.success) {
        const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
        
        const mensagemSucesso = `Seu formulário foi enviado com sucesso!\n\n Cortesia da:\n${patrocinadorAleatorio}`;
        
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
      console.error('❌ [UNIVERSAL] Erro:', error);
      mostrarErro('Erro de conexão. Verifique sua internet e tente novamente.');
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
    limparMensagens();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* ✅ NOVO: STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#72BF24"
      />
      
      {/* ✅ NOVO: HEADER RESPONSIVO */}
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: '#72BF24'
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>🪑 Política de Reserva</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* ✅ SEU CONTEÚDO ORIGINAL */}
      <ScrollView style={styles.content}>
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
             Política de Reserva de Móveis
          </Text>
          
          <Text style={[styles.description, { color: textColor }]}>
            Tem algum tipo de móvel, objeto ou eletrodoméstico para descartar/doar?.
          </Text>
          
          <Text style={[styles.subtitle, { color: textColor }]}>
            Vamos começar:
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

          <View style={styles.form}>
            {/* Nome */}
            <Text style={[styles.label, { color: textColor }]}>
              Seu nome: *
            </Text>
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
              Seu telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
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

            {/* Telefone de contato */}
            <Text style={[styles.label, { color: textColor }]}>
              Um telefone de contato, parente ou vizinho: ({contarDigitosTelefone(formData.telefoneContato)}/11)
            </Text>
            <TextInput
              style={[styles.input, { borderColor: primaryColor, color: textColor}]}
              value={formData.telefoneContato}
              onChangeText={handleTelefoneContatoChange}
              placeholder="(16) 99999-9999"
              placeholderTextColor={textColor + '80'}
              keyboardType="phone-pad"
              maxLength={15}
              editable={!enviando}
            />

            {/* Endereço */}
            <Text style={[styles.label, { color: textColor }]}>
              Endereço exato e referências próximas: * ({formData.endereco.length}/200)
            </Text>
            <TextInput
              style={[styles.textArea, { borderColor: primaryColor, color: textColor}]}
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
              <Text style={styles.fieldErrorText}>Endereço deve ter pelo menos 10 caracteres</Text>
            )}

            {/* 🔧 CAMPO DE FOTO UNIVERSAL */}
            <Text style={[styles.label, { color: textColor }]}>
              Foto do móvel/objeto (opcional):
              {Platform.OS === 'web' ? ' ' : ' '}
            </Text>
            
            {formData.fotoMovel ? (
              <View style={styles.fotoContainer}>
                <Image source={{ uri: formData.fotoMovel }} style={styles.fotoPreview} />
                <View style={styles.fotoButtons}>
                  <TouchableOpacity
                    style={[styles.fotoButton, { backgroundColor: primaryColor }]}
                    onPress={adicionarFoto}
                    disabled={enviando}
                  >
                    <Text style={styles.fotoButtonText}>
                      📷 Trocar {Platform.OS === 'web' ? 'Arquivo' : 'Foto'}
                    </Text>
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
                onPress={adicionarFoto}
                disabled={enviando}
              >
                <Text style={styles.addFotoIcon}>
                  {Platform.OS === 'web' ? '📁' : '📷'}
                </Text>
                <Text style={[styles.addFotoText, { color: textColor }]}>
                  {Platform.OS === 'web' 
                    ? 'Escolher arquivo de imagem' 
                    : 'Adicionar foto do móvel'
                  }
                </Text>
                <Text style={[styles.addFotoSubtext, { color: textColor }]}>
                  {Platform.OS === 'web'
                    ? 'Clique para selecionar uma imagem do seu computador'
                    : 'Toque para tirar uma foto ou escolher da galeria'
                  }
                </Text>
              </TouchableOpacity>
            )}

            {/* Dias de espera */}
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
                    limparMensagens();
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

            {/* Apto para doação */}
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
                    limparMensagens();
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
                {enviando ? 'Enviando... ' : 'Enviar formulário '}
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
  // ✅ SEUS ESTILOS ORIGINAIS (mantidos iguais)
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
  fieldErrorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  // 🔧 ESTILOS DE FOTO UNIVERSAIS
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
    lineHeight: 16,
  },
});

export default PoliticaReservaScreen;

