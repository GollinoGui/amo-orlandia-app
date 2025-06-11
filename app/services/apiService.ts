interface FormularioReservaData {
  nome: string;
  telefone: string;
  telefoneContato?: string;
  endereco: string;
  diasEspera: string;
  aptoDoacao: string;
  fotoMovel?: string;
}

interface ContatoData {
  nome: string;
  telefone: string;
  email?: string;
  mensagem: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

class ApiService {
  // 🌐 SEU IP CONFIGURADO
  private getBaseUrl(): string {
    return 'http://26.15.255.29:3000/api'; // 👈 SEU IP REAL
  }

  async enviarFormularioReserva(data: FormularioReservaData): Promise<ApiResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      console.log('📧 [API] Enviando reserva para:', baseUrl);
      
      const response = await fetch(`${baseUrl}/email/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ [API] Reserva enviada:', result);
        return result;
      } else {
        console.error('❌ [API] Erro do servidor:', result);
        return result;
      }
    } catch (error) {
      console.error('❌ [API] Erro de conexão:', error);
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      };
    }
  }

  async enviarFormularioContato(data: ContatoData): Promise<ApiResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      console.log('📧 [API] Enviando contato para:', baseUrl);
      
      const response = await fetch(`${baseUrl}/email/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ [API] Contato enviado:', result);
        return result;
      } else {
        console.error('❌ [API] Erro do servidor:', result);
        return result;
      }
    } catch (error) {
      console.error('❌ [API] Erro de conexão:', error);
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      };
    }
  }

  async testarConexao(): Promise<boolean> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await fetch(`${baseUrl}/health`);
      const result = await response.json();
      console.log('✅ [API] Backend conectado:', result);
      return true;
    } catch (error) {
      console.error('❌ [API] Backend desconectado:', error);
      return false;
    }
  }
}

export default new ApiService();
