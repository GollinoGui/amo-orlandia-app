// 🌐 Configure o IP do seu backend aqui
const API_BASE_URL = 'http://localhost:3000/api';

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
  private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async testarConexao(): Promise<boolean> {
    try {
      console.log('🧪 [API] Testando conexão:', API_BASE_URL);
      
      const response = await this.makeRequest(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        console.error('❌ [API] Status não OK:', response.status);
        return false;
      }

      const result = await response.json();
      console.log('✅ [API] Conexão OK:', result.message);
      return true;
    } catch (error) {
      console.error('❌ [API] Erro de conexão:', error);
      return false;
    }
  }

  async enviarFormularioReserva(data: FormularioReservaData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando reserva...');
      
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('telefone', data.telefone);
      if (data.telefoneContato) formData.append('telefoneContato', data.telefoneContato);
      formData.append('endereco', data.endereco);
      formData.append('diasEspera', data.diasEspera);
      formData.append('aptoDoacao', data.aptoDoacao);
      
      if (data.fotoMovel) {
        const response = await fetch(data.fotoMovel);
        const blob = await response.blob();
        formData.append('fotoMovel', blob, 'foto-movel.jpg');
      }

      const response = await this.makeRequest(`${API_BASE_URL}/email/reserva`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ [API] Erro reserva:', error);
      return { 
        success: false, 
        message: 'Erro de conexão. Verifique se o backend está rodando.' 
      };
    }
  }

  async enviarFormularioContato(data: FormularioContatoData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando contato...');
      
      const response = await this.makeRequest(`${API_BASE_URL}/email/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ [API] Erro contato:', error);
      return { 
        success: false, 
        message: 'Erro de conexão. Verifique se o backend está rodando.' 
      };
    }
  }

  async enviarFormularioAssociacao(data: FormularioAssociacaoData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📤 [API] Enviando associação...');
      console.log('🔗 [API] URL:', `${API_BASE_URL}/email/associacao`);
      
      const response = await this.makeRequest(`${API_BASE_URL}/email/associacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📥 [API] Status resposta:', response.status);

      if (!response.ok) {
        let errorText = 'Erro desconhecido';
        try {
          errorText = await response.text();
        } catch (e) {
          console.error('❌ [API] Erro ao ler resposta:', e);
        }
        console.error('❌ [API] Erro do servidor:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ [API] Sucesso:', result);
      return result;
    } catch (error: unknown) {
      console.error('❌ [API] Erro associação:', error);
      
      // Verificar se é erro de timeout
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, message: 'Timeout: Conexão muito lenta.' };
      }
      
      // Verificar se é erro de rede
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          message: 'Erro de conexão. Verifique se o backend está rodando na porta 3000.' 
        };
      }
      
      // Erro genérico
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return { 
        success: false, 
        message: `Erro: ${errorMessage}` 
      };
    }
  }
}

export default new ApiService();
