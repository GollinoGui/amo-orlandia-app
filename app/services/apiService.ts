import { Platform } from 'react-native';

// 🌐 IP CORRETO CONFIGURADO
const getApiBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }
    // 🚀 RAILWAY URL - SEMPRE ONLINE
  if (__DEV__) {
    // Em desenvolvimento, pode escolher:
    return 'https://amo-orlandia-production.up.railway.app/api'; // Online
    // return 'http://192.168.1.102:3000/api'; // Local (descomente se quiser)
  }
  
  // Em produção, sempre Railway
  return 'https://amo-orlandia-production.up.railway.app/api';
};


const API_BASE_URL = getApiBaseUrl();

interface FormularioReservaData {
  nome: string;
  telefone: string;
  telefoneContato?: string;
  endereco: string;
  diasEspera: string;
  aptoDoacao: string;
  fotoMovel?: string;
}

interface FormularioContatoData {
  nome: string;
  telefone: string;
  email?: string;
  mensagem: string;
  assunto: string;
}

interface FormularioDenunciaData {
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
interface FormularioAssociacaoData {
  nomeCompleto: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  enderecoCompleto: string;
  profissao: string;
  motivoAssociacao: string;
  comoConheceu: string;
}

class ApiService {
  // 🔧 FUNÇÃO AUXILIAR PARA FETCH COM TIMEOUT
  private async fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 30000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  

  // 🔧 MÉTODO DE TESTE DE CONECTIVIDADE
  async testarConectividade(): Promise<boolean> {
  try {
    console.log('🧪 [API] Testando conectividade...');
    console.log('🔗 [API] URL base:', API_BASE_URL);
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }, 10000);
    
    console.log('📊 [API] Status conectividade:', response.status);
    return response.ok;
  } catch (error) {
    console.error('❌ [API] Erro conectividade:', error);
    return false;
  }
} 

  // 🧪 TESTE DE CONEXÃO
  async testarConexao(): Promise<boolean> {
  try {
    console.log('🧪 [API] Testando conexão:', API_BASE_URL);
    console.log('🧪 [API] Plataforma:', Platform.OS);
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }, 10000);
    
    if (!response.ok) {
      console.error('❌ [API] Status não OK:', response.status);
      return false;
    }

    const result = await response.json() as { message: string };
    console.log('✅ [API] Conexão OK:', result.message);
    return true;
  } catch (error) {
    console.error('❌ [API] Erro de conexão:', error);
    return false;
  }
}
  // 📧 RESERVA
  async enviarFormularioReserva(data: FormularioReservaData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando reserva...');
      console.log('🔗 [API] URL:', `${API_BASE_URL}/email/reserva`);
      console.log('📱 [API] Plataforma:', Platform.OS);
      
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/email/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      }, 60000);

      console.log('📥 [API] Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [API] Erro do servidor:', errorText);
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json() as { success: boolean; message: string };
      console.log('✅ [API] Sucesso:', result);
      return result;
    } catch (error) {
      console.error('❌ [API] Erro reserva:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, message: 'Timeout: Conexão muito lenta.' };
      }
      
      return { 
        success: false, 
        message: `Erro de conexão (${Platform.OS}). Verifique sua internet.` 
      };
    }
  }

  // 📞 CONTATO
  async enviarFormularioContato(data: FormularioContatoData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando contato...');
      console.log('🔗 [API] URL:', `${API_BASE_URL}/email/contato`);
      console.log('📱 [API] Plataforma:', Platform.OS);
      console.log('📤 [API] Dados:', data);
      
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/email/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      }, 60000);

      console.log('📥 [API] Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [API] Erro do servidor:', errorText);
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json() as { success: boolean; message: string };
      console.log('✅ [API] Sucesso:', result);
      return result;
    } catch (error) {
      console.error('❌ [API] Erro contato:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, message: 'Timeout: Conexão muito lenta.' };
      }
      
      return { 
        success: false, 
        message: `Erro de conexão (${Platform.OS}). Verifique sua internet.` 
      };
    }
  }

  // 🤝 ASSOCIAÇÃO - FUNÇÃO CORRIGIDA
  async enviarFormularioAssociacao(data: FormularioAssociacaoData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando associação...');
    console.log('🔗 [API] URL:', `${API_BASE_URL}/email/associacao`);
    console.log('📤 [API] Dados:', data);
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/email/associacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }, 60000);

    console.log('📥 [API] Status resposta:', response.status);

    if (!response.ok) {
      let errorText = 'Erro desconhecido';
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorText;
        console.error('❌ [API] Erro do servidor:', errorData);
      } catch (e) {
        try {
          errorText = await response.text();
        } catch (e2) {
          console.error('❌ [API] Erro ao ler resposta:', e2);
        }
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ [API] Sucesso:', result);
    return result;
  } catch (error: unknown) {
    console.error('❌ [API] Erro associação:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, message: 'Timeout: Conexão muito lenta.' };
    }
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return { 
        success: false, 
        message: `Erro de conexão. Verifique se o backend está rodando.` 
      };
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { 
      success: false, 
      message: `Erro: ${errorMessage}` 
    };
  }
}
async enviarFormularioDenuncia(data: FormularioDenunciaData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando denúncia...');
    console.log('🔗 [API] URL:', `${API_BASE_URL}/email/denuncia`);
    
    // PREPARAR FORMDATA PARA FOTOS
    const formData = new FormData();
    formData.append('tipo', data.tipo);
    formData.append('descricao', data.descricao);
    formData.append('endereco', data.endereco);
    formData.append('nomeCompleto', data.nomeCompleto);
    formData.append('telefone', data.telefone);
    formData.append('email', data.email);
    
    // ADICIONAR COORDENADAS SE EXISTIR
    if (data.coordenadas) {
      formData.append('latitude', data.coordenadas.latitude.toString());
      formData.append('longitude', data.coordenadas.longitude.toString());
    }
    
    // ADICIONAR FOTOS SE EXISTIREM
    if (data.fotos && data.fotos.length > 0) {
      for (let i = 0; i < data.fotos.length; i++) {
        const foto = data.fotos[i];
        
        try {
          if (foto.startsWith('data:')) {
            // FOTO BASE64 (web)
            const response = await fetch(foto);
            const blob = await response.blob();
            formData.append('fotos', blob, `denuncia-foto-${i + 1}.jpg`);
          } else if (foto.startsWith('file://') || foto.startsWith('content://')) {
            // FOTO URI (mobile)
            const fileInfo = {
              uri: foto,
              type: 'image/jpeg',
              name: `denuncia-foto-${i + 1}.jpg`,
            };
            formData.append('fotos', fileInfo as any);
          } else {
            // FOTO HTTP/HTTPS
            const response = await fetch(foto);
            const blob = await response.blob();
            formData.append('fotos', blob, `denuncia-foto-${i + 1}.jpg`);
          }
        } catch (photoError) {
          console.warn(`⚠️ [API] Erro ao processar foto ${i + 1}:`, photoError);
          // Continua sem esta foto específica
        }
      }
    }

    console.log('📤 [API] FormData preparado, enviando...');

    const response = await this.fetchWithTimeout(`${API_BASE_URL}/email/denuncia`, {
      method: 'POST',
      body: formData,
      // NÃO definir Content-Type - deixar o browser definir automaticamente para multipart/form-data
    }, 60000);

    console.log('📥 [API] Status:', response.status);

    if (!response.ok) {
      let errorText = 'Erro desconhecido';
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorText;
        console.error('❌ [API] Erro do servidor:', errorData);
      } catch (e) {
        try {
          errorText = await response.text();
          console.error('❌ [API] Erro texto:', errorText);
        } catch (e2) {
          console.error('❌ [API] Erro ao ler resposta:', e2);
        }
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ [API] Denúncia enviada:', result);
    return result;
  } catch (error) {
    console.error('❌ [API] Erro denúncia:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, message: 'Timeout: Conexão muito lenta.' };
    }
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return { 
        success: false, 
        message: `Erro de conexão. Verifique sua internet.` 
      };
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { 
      success: false, 
      message: `Erro: ${errorMessage}` 
    };
  }
}
}

export default new ApiService();
