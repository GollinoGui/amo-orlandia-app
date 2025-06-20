
// 🔥 FIREBASE FUNCTIONS URL CORRETA
const getApiBaseUrl = () => {
  // URL do Firebase Functions do seu projeto
  return 'https://us-central1-amo-orlandia-8c114.cloudfunctions.net';
};

const API_BASE_URL = 'https://us-central1-amo-orlandia-8c114.cloudfunctions.net';

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

  

  
  // 📧 RESERVA
  // 📧 RESERVA
async enviarFormularioReserva(data: FormularioReservaData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando reserva para Firebase...');
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/enviarFormularioReserva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // ← CORRIGIDO!
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    }, 60000);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API] Erro do Firebase:', errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json() as { success: boolean; message: string };
    console.log('✅ [API] Sucesso Firebase:', result);
    return result;
  } catch (error) {
    console.error('❌ [API] Erro reserva Firebase:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, message: 'Timeout: Conexão muito lenta.' };
    }
    
    return { 
      success: false, 
      message: `Erro de conexão Firebase. Verifique sua internet.` 
    };
  }
}


  // 📞 CONTATO
  async enviarFormularioContato(data: FormularioContatoData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando contato para Firebase...');
    console.log('📤 [API] Dados:', data);
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/enviarFormularioContato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // ← IMPORTANTE!
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    }, 60000);

    console.log('📥 [API] Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API] Erro do Firebase:', errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json() as { success: boolean; message: string };
    console.log('✅ [API] Sucesso Firebase:', result);
    return result;
  } catch (error) {
    console.error('❌ [API] Erro contato Firebase:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, message: 'Timeout: Conexão muito lenta.' };
    }
    
    return { 
      success: false, 
      message: `Erro de conexão Firebase. Verifique sua internet.` 
    };
  }
}

  
  // 🤝 ASSOCIAÇÃO
async enviarFormularioAssociacao(data: FormularioAssociacaoData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando associação para Firebase...');
    
    const response = await this.fetchWithTimeout(`${API_BASE_URL}/enviarFormularioAssociacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // ← CORRIGIDO!
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    }, 60000);

    if (!response.ok) {
      let errorText = 'Erro desconhecido';
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorText;
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
    console.log('✅ [API] Sucesso Firebase:', result);
    return result;
  } catch (error: unknown) {
    console.error('❌ [API] Erro associação Firebase:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, message: 'Timeout: Conexão muito lenta.' };
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { 
      success: false, 
      message: `Erro Firebase: ${errorMessage}` 
    };
  }
}


  // 🚨 DENÚNCIA
  // Adicione esta função DENTRO da classe ApiService, após a função enviarFormularioAssociacao
async enviarFormularioDenuncia(data: FormularioDenunciaData): Promise<{ success: boolean; message: string }> {
  try {
    console.log('📤 [API] Enviando denúncia para Firebase...');

    // Remover as fotos (não usadas no backend)
    const payload = {
      tipo: data.tipo,
      descricao: data.descricao,
      endereco: data.endereco,
      nomeCompleto: data.nomeCompleto,
      telefone: data.telefone,
      email: data.email,
      coordenadas: data.coordenadas ?? null
    };

    const response = await this.fetchWithTimeout(`${API_BASE_URL}/enviarFormularioDenuncia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }, 60000);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao enviar denúncia');
    }

    const result = await response.json();
    console.log('✅ [API] Denúncia enviada com sucesso:', result);
    return result;
  } catch (error) {
    console.error('❌ [API] Erro ao enviar denúncia:', error);
    return {
      success: false,
      message: 'Erro ao enviar denúncia. Verifique sua internet ou tente novamente.'
    };
  }
}
}
const apiService = new ApiService();
export default apiService;