import { Platform } from 'react-native';

// 🌐 IP CORRETO CONFIGURADO
const getApiBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }
  // ✅ SEU IP CORRETO
  return 'http://192.168.1.102:3000/api';
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

interface FormularioAssociacaoData {
  nomeCompleto: string;
  cpf: string;
  rg: string;
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
      }, 10000); // 10s timeout para teste
      
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
      }, 60000); // 60s timeout

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
      }, 60000); // 60s timeout

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

  // 🤝 ASSOCIAÇÃO
  async enviarFormularioAssociacao(data: FormularioAssociacaoData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando associação...');
      console.log('🔗 [API] URL:', `${API_BASE_URL}/email/associacao`);
      console.log('📱 [API] Plataforma:', Platform.OS);
      
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/email/associacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      }, 60000); // 60s timeout

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
      console.error('❌ [API] Erro associação:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, message: 'Timeout: Conexão muito lenta.' };
      }
      
      return { 
        success: false, 
        message: `Erro de conexão (${Platform.OS}). Verifique sua internet.` 
      };
    }
  }
}

export default new ApiService();
