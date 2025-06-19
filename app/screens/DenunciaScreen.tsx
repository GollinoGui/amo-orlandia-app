import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiService from '../services/apiService';


interface DenunciaData {
  tipo: string;
  descricao: string;
  endereco: string;
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
  fotos: string[];
  nomeCompleto: string;
  telefone: string;
  email: string;
}
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





export function DenunciaScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const primaryColor = '#E74C3C';

  const [formData, setFormData] = useState<DenunciaData>({
    tipo: '',
    descricao: '',
    endereco: '',
    fotos: [],
    nomeCompleto: '',
    telefone: '',
    email: ''
  });

  const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [buscandoLocalizacao, setBuscandoLocalizacao] = useState(false);

  // ✅ ADICIONAR AQUI (APÓS OS ESTADOS)
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


  // ✅ FUNÇÕES DE NOTIFICAÇÃO (APÓS OS ESTADOS)
  const mostrarSucesso = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setSucesso(mensagem);
      setTimeout(() => setSucesso(''), 8000);
    } else {
      Alert.alert('🎉 Sucesso!', mensagem, [
        { text: '✅ OK', onPress: () => limparFormulario() }
      ]);
    }
  };

  const mostrarErro = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setErro(mensagem);
      setTimeout(() => setErro(''), 5000);
    } else {
      Alert.alert('❌ Erro', mensagem);
    }
  };

  // ✅ FUNÇÃO LIMPAR FORMULÁRIO (APÓS OS ESTADOS)
  const limparFormulario = () => {
    setFormData({
      tipo: '',
      descricao: '',
      endereco: '',
      fotos: [],
      nomeCompleto: '',
      telefone: '',
      email: ''
    });
    setSucesso('');
    setErro('');
    setLocalizacao(null);
  };

  const tiposDenuncia = [
    'Móveis fora do dia do Cata Galho',
    'Lixo em local inadequado',
    'Entulho de construção',
    'Galhos fora do cronograma',
    'Lixo eletrônico',
    'Outros'
  ];

  // FUNÇÕES DE VALIDAÇÃO E FORMATAÇÃO
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  // HANDLERS MELHORADOS
  const handleNomeChange = (texto: string) => {
    const textoLimpo = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFormData({...formData, nomeCompleto: textoLimpo});
    setErro('');
  };

  const handleTelefoneChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefone: telefoneFormatado});
    setErro('');
  };

  const handleEmailChange = (texto: string) => {
    setFormData({...formData, email: texto.toLowerCase().trim()});
    setErro('');
  };

  // OBTER LOCALIZAÇÃO COM API ALTERNATIVA
  useEffect(() => {
    obterLocalizacao();
  }, []);

  // FUNÇÃO PARA BUSCAR ENDEREÇO VIA API ALTERNATIVA
  const buscarEnderecoPorCoordenadas = async (latitude: number, longitude: number): Promise<string> => {
    try {
      console.log('Buscando endereço via API alternativa...');
      
      // USANDO API GRATUITA NOMINATIM (OpenStreetMap)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'AMO-Orlandia-App/1.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Resposta da API:', data);
      
      if (data && data.address) {
        const addr = data.address;
        
        // MONTAR ENDEREÇO BRASILEIRO
        const rua = addr.road || addr.pedestrian || addr.residential || '';
        const numero = addr.house_number || '';
        const bairro = addr.neighbourhood || addr.suburb || addr.quarter || '';
        const cidade = addr.city || addr.town || addr.village || 'Orlândia';
        const estado = addr.state || 'SP';
        
        let enderecoCompleto = '';
        
        if (rua) {
          enderecoCompleto += rua;
          if (numero) enderecoCompleto += `, ${numero}`;
        }
        
        if (bairro) {
          if (enderecoCompleto) enderecoCompleto += ' - ';
          enderecoCompleto += bairro;
        }
        
        if (enderecoCompleto) enderecoCompleto += ', ';
        enderecoCompleto += `${cidade} - ${estado}`;
        
        console.log('Endereço montado:', enderecoCompleto);
        return enderecoCompleto;
      }
      
      throw new Error('Endereço não encontrado na resposta');
      
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return `Coordenadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} - Orlândia, SP`;
    }
  };

  const obterLocalizacao = async () => {
    setBuscandoLocalizacao(true);
    try {
      console.log('Solicitando permissão de localização...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão de Localização',
          'Para facilitar sua denúncia, permita o acesso à localização. Você ainda pode digitar o endereço manualmente.'
        );
        setBuscandoLocalizacao(false);
        return;
      }

      console.log('Obtendo localização atual...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocalizacao(location);
      console.log('Localização obtida:', location.coords);

      // BUSCAR ENDEREÇO VIA API ALTERNATIVA
      const enderecoEncontrado = await buscarEnderecoPorCoordenadas(
        location.coords.latitude,
        location.coords.longitude
      );
      
      console.log('Endereço encontrado:', enderecoEncontrado);
      
      // COLOCAR ENDEREÇO NO CAMPO
      setFormData(prev => ({ 
        ...prev, 
        endereco: enderecoEncontrado
      }));
      
      Alert.alert(
        'Localização Atualizada!',
        `Endereço encontrado:\n\n${enderecoEncontrado}\n\nVocê pode editar se necessário.`,
        [{ text: 'OK' }]
      );

    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert(
        'Erro de Localização',
        'Não foi possível obter sua localização. Verifique se o GPS está ativo e digite o endereço manualmente.'
      );
    } finally {
      setBuscandoLocalizacao(false);
    }
  };

  // TIRAR FOTO CORRIGIDA
  const tirarFoto = async () => {
    try {
      console.log('[CAMERA] Iniciando processo...');
      
      if (formData.fotos.length >= 5) {
        Alert.alert('Limite Atingido', 'Máximo de 5 fotos permitidas.');
        return;
      }

      console.log('[CAMERA] Verificando permissões...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      console.log('[CAMERA] Status da permissão:', status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária', 
          'Precisamos de acesso à câmera para tirar fotos da denúncia.\n\nVá em Configurações > Privacidade > Câmera e permita o acesso.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Entendi', style: 'default' }
          ]
        );
        return;
      }

      console.log('[CAMERA] Abrindo câmera...');
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
      });

      console.log('[CAMERA] Resultado:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const novaFoto = result.assets[0].uri;
        console.log('[CAMERA] Nova foto:', novaFoto);
        
        setFormData(prev => ({
          ...prev,
          fotos: [...prev.fotos, novaFoto]
        }));
        
        Alert.alert('Sucesso!', 'Foto capturada com sucesso!');
      } else {
        console.log('[CAMERA] Cancelado pelo usuário');
      }
    } catch (error) {
      console.error('[CAMERA] Erro:', error);
      Alert.alert(
        'Erro na Câmera', 
        `Não foi possível tirar a foto.\n\nErro: ${error}\n\nTente usar a galeria como alternativa.`
      );
    }
  };

  // ESCOLHER FOTO CORRIGIDA
  const escolherFoto = async () => {
    try {
      console.log('[GALLERY] Iniciando processo...');
      
      if (formData.fotos.length >= 5) {
        Alert.alert('Limite Atingido', 'Máximo de 5 fotos permitidas.');
        return;
      }

      console.log('[GALLERY] Verificando permissões...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      console.log('[GALLERY] Status da permissão:', status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária', 
          'Precisamos de acesso à galeria para escolher fotos da denúncia.\n\nVá em Configurações > Privacidade > Fotos e permita o acesso.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Entendi', style: 'default' }
          ]
        );
        return;
      }

      console.log('[GALLERY] Abrindo galeria...');
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
        allowsMultipleSelection: false,
      });

      console.log('[GALLERY] Resultado:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const novaFoto = result.assets[0].uri;
        console.log('[GALLERY] Nova foto:', novaFoto);
        
        setFormData(prev => ({
          ...prev,
          fotos: [...prev.fotos, novaFoto]
        }));
        
        Alert.alert('Sucesso!', 'Foto selecionada com sucesso!');
      } else {
        console.log('[GALLERY] Cancelado pelo usuário');
      }
    } catch (error) {
      console.error('[GALLERY] Erro:', error);
      Alert.alert(
        'Erro na Galeria', 
        `Não foi possível escolher a foto.\n\nErro: ${error}\n\nTente tirar uma foto com a câmera.`
      );
    }
  };

  // FUNÇÃO DE REMOVER FOTO SUPER ROBUSTA
  const removerFoto = (index: number) => {
    console.log(`[REMOVE] === INICIANDO REMOÇÃO ===`);
    console.log(`[REMOVE] Índice solicitado: ${index}`);
    console.log(`[REMOVE] Total de fotos atual: ${formData.fotos.length}`);
    console.log(`[REMOVE] Array atual:`, formData.fotos);
    
    // VALIDAÇÃO DE ÍNDICE
     if (index < 0 || index >= formData.fotos.length) {
    console.error(`[REMOVE] ERRO: Índice inválido ${index}`);
    
    // COMPATIBILIDADE WEB
    if (Platform.OS === 'web') {
      setErro('Erro: Índice de foto inválido');
      setTimeout(() => setErro(''), 3000);
    } else {
      Alert.alert('Erro', 'Índice de foto inválido');
    }
    return;
  }
    const fotoParaRemover = formData.fotos[index];
    console.log(`[REMOVE] Foto a ser removida:`, fotoParaRemover);
    
    // CONFIRMAÇÃO COMPATÍVEL COM WEB
  if (Platform.OS === 'web') {
    // NO WEB: Usar confirm() nativo do browser
    const confirmacao = window.confirm(`Deseja remover a foto ${index + 1} de ${formData.fotos.length}?`);
    
    if (confirmacao) {
      console.log(`[REMOVE] Confirmado via web - removendo foto ${index}`);
      
      // CRIAR NOVA ARRAY SEM A FOTO SELECIONADA
      const novasFotos = formData.fotos.filter((_, i) => i !== index);
      
      console.log(`[REMOVE] Fotos restantes: ${novasFotos.length}`);
      console.log(`[REMOVE] Nova array:`, novasFotos);
      
      // ATUALIZAR ESTADO
      setFormData(prev => ({
        ...prev,
        fotos: novasFotos
      }));
      
      // FEEDBACK VISUAL PARA WEB
      setSucesso(`✅ Foto ${index + 1} removida com sucesso!`);
      setTimeout(() => setSucesso(''), 3000);
      
      console.log(`[REMOVE] Foto ${index} removida com sucesso`);
    } else {
      console.log('[REMOVE] Cancelado pelo usuário (web)');
    }
  } else {
    // NO MOBILE: Usar Alert normal
    Alert.alert(
      'Confirmar Remoção',
      `Deseja remover a foto ${index + 1} de ${formData.fotos.length}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => console.log('[REMOVE] Cancelado pelo usuário')
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            console.log(`[REMOVE] Confirmado - removendo foto ${index}`);
            
            // CRIAR NOVA ARRAY SEM A FOTO SELECIONADA
            const novasFotos = formData.fotos.filter((_, i) => i !== index);
            
            console.log(`[REMOVE] Fotos restantes: ${novasFotos.length}`);
            console.log(`[REMOVE] Nova array:`, novasFotos);
            
            // ATUALIZAR ESTADO
            setFormData(prev => ({
              ...prev,
              fotos: novasFotos
            }));
            
            // FEEDBACK VISUAL
            Alert.alert('Removida!', `Foto ${index + 1} removida com sucesso.`);
            console.log(`[REMOVE] Foto ${index} removida com sucesso`);
          }
        }
      ]
    );
  }
};

  // VALIDAÇÕES MELHORADAS
  // ✅ ATUALIZAR A FUNÇÃO enviarDenuncia (que chama as validações)
const enviarDenuncia = async () => {
  console.log('=== [DENUNCIA] INICIANDO VALIDAÇÕES ===');
  
  // Limpar mensagens anteriores
  setErro('');
  setSucesso('');

  // VALIDAÇÃO: Tipo
  if (!formData.tipo.trim()) {
    mostrarErro('Por favor, selecione o tipo de denúncia.');
    return;
  }

  // VALIDAÇÃO: Descrição
  if (!formData.descricao.trim()) {
    mostrarErro('Por favor, descreva o problema.');
    return;
  }

  if (formData.descricao.trim().length < 10) {
    mostrarErro('Descrição deve ter pelo menos 10 caracteres.');
    return;
  }

  // VALIDAÇÃO: Endereço
  if (!formData.endereco.trim()) {
    mostrarErro('Por favor, informe o endereço.');
    return;
  }

  // ✅ VALIDAÇÃO: FOTOS (NOVA)
  if (formData.fotos.length === 0) {
    mostrarErro('Por favor, adicione pelo menos 1 foto como evidência da denúncia.');
    return;
  }

  // VALIDAÇÃO: Nome
  if (!formData.nomeCompleto.trim()) {
    mostrarErro('Por favor, informe seu nome completo.');
    return;
  }

  if (!validarNome(formData.nomeCompleto)) {
    mostrarErro('Nome deve conter apenas letras e ter pelo menos 2 caracteres.');
    return;
  }

  // VALIDAÇÃO: Telefone
  if (!formData.telefone.trim()) {
    mostrarErro('Por favor, informe seu telefone.');
    return;
  }

  if (!validarTelefone(formData.telefone)) {
    mostrarErro('Telefone deve ter 10 ou 11 dígitos. Formato: (16) 99999-9999');
    return;
  }

  // VALIDAÇÃO: Email
  if (!formData.email.trim()) {
    mostrarErro('Por favor, informe seu email.');
    return;
  }

  if (!validarEmail(formData.email)) {
    mostrarErro('Email inválido. Formato: exemplo@email.com');
    return;
  }

  console.log('✅ [DENUNCIA] Todas as validações passaram!');
  
  // Prosseguir com o envio
  await processarEnvio();
};


  const processarEnvio = async () => {
  setEnviando(true);
  setErro('');
  setSucesso('');
  
  try {
    console.log('📤 [DENUNCIA] Preparando dados para envio...');
    
    const dadosEnvio = {
      tipo: formData.tipo,
      descricao: formData.descricao,
      endereco: formData.endereco,
      coordenadas: localizacao ? {
        latitude: localizacao.coords.latitude,
        longitude: localizacao.coords.longitude
      } : undefined,
      fotos: formData.fotos,
      nomeCompleto: formData.nomeCompleto,
      telefone: formData.telefone,
      email: formData.email
    };

    console.log('📧 [DENUNCIA] Enviando via API...');
    
    const resultado = await apiService.enviarFormularioDenuncia(dadosEnvio);
    
    if (resultado.success) {
      const protocolo = '#AMO' + Date.now().toString().slice(-6);
      const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
      
      // ✅ MENSAGEM CORRIGIDA - MAIS COMPACTA
      const mensagemSucesso = `Denúncia enviada com sucesso!


Nossa equipe analisará sua denúncia e tomará as medidas necessárias.

Obrigado por ajudar a manter Orlândia limpa!

 Cortesia da:
${patrocinadorAleatorio}`;

      mostrarSucesso(mensagemSucesso);
      
      if (Platform.OS === 'web') {
        setTimeout(() => {
          limparFormulario();
        }, 8000);
      }
      
    } else {
      mostrarErro(resultado.message || 'Erro ao enviar denúncia. Tente novamente.');
    }
    
  } catch (error) {
    console.error('❌ [DENUNCIA] Erro no envio:', error);
    mostrarErro('Erro inesperado ao enviar denúncia. Verifique sua conexão e tente novamente.');
  } finally {
    setEnviando(false);
  }
};


   return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* ✅ STATUS BAR */}
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#E74C3C"
      />
      
      {/* ✅ HEADER COM SETA DE VOLTAR */}
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: '#E74C3C'
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>📝 Nova Denúncia</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* ✅ CONTEÚDO */}
      <ScrollView style={styles.content}>
        {/* MENSAGENS */}
        {erro ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{erro}</Text>
          </View>
        ) : null}

        {sucesso ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{sucesso}</Text>
          </View>
        ) : null}

        {/* FORMULÁRIO */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.cardTitle, { color: primaryColor }]}>
            Dados da Denúncia
          </Text>

          {/* TIPO DE DENÚNCIA */}
          <Text style={[styles.label, { color: textColor }]}>Tipo de Denúncia: *</Text>
          {Platform.OS === 'web' ? (
            <select
              value={formData.tipo}
              onChange={e => setFormData({ ...formData, tipo: e.target.value })}
              style={{
                borderWidth: 1,
                borderColor: primaryColor,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 10,
                width: '100%',
                color: textColor,
                backgroundColor: cardColor,
              }}
            >
              <option value="">Selecione o tipo</option>
              {tiposDenuncia.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          ) : (
            <Picker
              selectedValue={formData.tipo}
              onValueChange={(value) => setFormData({ ...formData, tipo: value })}
              style={[styles.picker, { color: textColor }]}
            >
              <Picker.Item label="Selecione o tipo" value="" />
              {tiposDenuncia.map(tipo => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>
          )}

          {/* DESCRIÇÃO */}
          <Text style={[styles.label, { color: textColor }]}>
            Descrição da Situação: * ({formData.descricao.length}/500)
          </Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            placeholder="Descreva detalhadamente a situação... (mínimo 10 caracteres)"
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          {formData.descricao.length > 0 && formData.descricao.length < 10 && (
            <Text style={styles.fieldErrorText}>Descrição deve ter pelo menos 10 caracteres</Text>
          )}

          {/* ENDEREÇO COM GPS MELHORADO */}
          <Text style={[styles.label, { color: textColor }]}>Endereço: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.endereco}
            onChangeText={(text) => setFormData({ ...formData, endereco: text })}
            placeholder="Digite o endereço completo do descarte irregular"
            placeholderTextColor={textColor + '80'}
            multiline
          />
          
          {localizacao && (
            <Text style={[styles.gpsInfo, { color: '#27AE60' }]}>
              GPS: {localizacao.coords.latitude.toFixed(6)}, {localizacao.coords.longitude.toFixed(6)}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.gpsButton, 
              { 
                backgroundColor: buscandoLocalizacao ? '#95A5A6' : '#27AE60',
                opacity: buscandoLocalizacao ? 0.7 : 1
              }
            ]}
            onPress={obterLocalizacao}
            disabled={buscandoLocalizacao}
          >
            <Text style={styles.gpsButtonText}>
              {buscandoLocalizacao ? 'Buscando endereço...' : 'Obter Endereço Automático'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOTOS COM BOTÃO DE REMOVER MELHORADO */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.cardTitle, { color: primaryColor }]}>
            Fotos da Denúncia ({formData.fotos.length}/5)
          </Text>

          <Text style={[styles.photoInstructions, { color: textColor }]}>
            Tire fotos claras da situação irregular para fortalecer sua denúncia
          </Text>

          <View style={styles.photoButtons}>
            <TouchableOpacity
              style={[
                styles.photoButton, 
                { 
                  backgroundColor: formData.fotos.length >= 5 ? '#95A5A6' : '#3498DB',
                  opacity: formData.fotos.length >= 5 ? 0.5 : 1
                }
              ]}
              onPress={tirarFoto}
              disabled={formData.fotos.length >= 5}
            >
              <Text style={styles.photoButtonText}>Tirar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.photoButton, 
                { 
                  backgroundColor: formData.fotos.length >= 5 ? '#95A5A6' : '#9B59B6',
                  opacity: formData.fotos.length >= 5 ? 0.5 : 1
                }
              ]}
              onPress={escolherFoto}
              disabled={formData.fotos.length >= 5}
            >
              <Text style={styles.photoButtonText}>Galeria</Text>
            </TouchableOpacity>
          </View>

          {formData.fotos.length >= 5 && (
            <Text style={[styles.maxPhotosText, { color: '#E67E22' }]}>
              Máximo de 5 fotos atingido
            </Text>
          )}

          {/* PREVIEW DAS FOTOS COM BOTÃO DE REMOVER MELHORADO */}
          {formData.fotos.length > 0 && (
            <View style={styles.photosContainer}>
              <Text style={[styles.photosTitle, { color: textColor }]}>
                Fotos Selecionadas ({formData.fotos.length}):
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {formData.fotos.map((foto, index) => (
                  <View key={`foto-${index}-${foto.slice(-10)}`} style={styles.photoPreview}>
                    <Image source={{ uri: foto }} style={styles.photoImage} />
                    
                    {/* BOTÃO DE REMOVER MELHORADO COM PRESSABLE */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.removePhotoButton,
                        { 
                          opacity: pressed ? 0.7 : 1,
                          transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }]
                        }
                      ]}
                      onPress={() => {
                        console.log(`[UI] Botão remover pressionado para foto ${index}`);
                        removerFoto(index);
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.removePhotoText}>×</Text>
                    </Pressable>
                    
                    <Text style={[styles.photoNumber, { color: textColor }]}>
                      Foto {index + 1}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              
              {/* BOTÃO ALTERNATIVO PARA REMOVER ÚLTIMA FOTO */}
              <TouchableOpacity
                style={[styles.removeLastPhotoButton, { backgroundColor: '#E74C3C' }]}
                onPress={() => {
                  console.log('[UI] Botão remover última foto pressionado');
                  removerFoto(formData.fotos.length - 1);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.removeLastPhotoText}>
                  Remover Última Foto
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* DADOS PESSOAIS */}
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.cardTitle, { color: primaryColor }]}>
            Seus Dados
          </Text>

          {/* NOME */}
          <Text style={[styles.label, { color: textColor }]}>Nome Completo: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.nomeCompleto}
            onChangeText={handleNomeChange}
            placeholder="Seu nome completo"
            placeholderTextColor={textColor + '80'}
            maxLength={50}
          />
          {formData.nomeCompleto.length > 0 && !validarNome(formData.nomeCompleto) && (
            <Text style={styles.fieldErrorText}>Nome deve conter apenas letras</Text>
          )}

          {/* TELEFONE */}
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
          />
          {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
            <Text style={styles.fieldErrorText}>Telefone deve ter 10 ou 11 dígitos</Text>
          )}

          {/* EMAIL OBRIGATÓRIO */}
          <Text style={[styles.label, { color: textColor }]}>Email: *</Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.email}
            onChangeText={handleEmailChange}
            placeholder="seu@email.com"
            placeholderTextColor={textColor + '80'}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {formData.email.length > 0 && !validarEmail(formData.email) && (
            <Text style={styles.fieldErrorText}>Email inválido</Text>
          )}
        </View>

        {/* BOTÃO DE ENVIO */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { 
              backgroundColor: enviando ? '#95A5A6' : primaryColor,
              opacity: enviando ? 0.7 : 1
            }
          ]}
          onPress={enviarDenuncia}
          disabled={enviando}
        >
          <Text style={styles.submitButtonText}>
            {enviando ? 'Enviando...' : 'Enviar Denúncia'}
          </Text>
        </TouchableOpacity>

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
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1000,
  },
  backButton: {
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 52,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  successText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  gpsInfo: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  gpsButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  gpsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photoInstructions: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  photoButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  maxPhotosText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  photosContainer: {
    marginTop: 15,
  },
  photosTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  photoPreview: {
    position: 'relative',
    marginRight: 15,
    alignItems: 'center',
  },
  photoImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#E74C3C',
  },
  // BOTÃO DE REMOVER MELHORADO COM PRESSABLE
  removePhotoButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: '#E74C3C',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    borderWidth: 4,
    borderColor: '#fff',
    zIndex: 999,
  },
  removePhotoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
    textAlign: 'center',
  },
  photoNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  // BOTÃO ALTERNATIVO PARA REMOVER ÚLTIMA FOTO
  removeLastPhotoButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  removeLastPhotoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#27AE60',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    lineHeight: 22,
  },
  // CARD DE DEBUG
  debugCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  debugText: {
    fontSize: 12,
    lineHeight: 18,
  },
  fieldErrorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default DenunciaScreen;


