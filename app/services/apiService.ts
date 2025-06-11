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
  private getBaseUrl(): string {
    return 'http://26.15.255.29:3000/api';
  }

  // 📸 MÉTODO ATUALIZADO PARA ENVIAR IMAGEM
  async enviarFormularioReserva(data: FormularioReservaData): Promise<ApiResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      console.log('📧 [API] Enviando reserva para:', baseUrl);
      
      // 📸 CRIAR FORMDATA PARA ENVIAR ARQUIVO
      const formData = new FormData();
      
      // Adicionar campos de texto
      formData.append('nome', data.nome);
      formData.append('telefone', data.telefone);
      if (data.telefoneContato) formData.append('telefoneContato', data.telefoneContato);
      formData.append('endereco', data.endereco);
      formData.append('diasEspera', data.diasEspera);
      formData.append('aptoDoacao', data.aptoDoacao);
      
      // 📸 ADICIONAR FOTO SE EXISTIR
      if (data.fotoMovel) {
        console.log('📸 [API] Adicionando foto:', data.fotoMovel);
        
        // Criar blob da imagem
        const response = await fetch(data.fotoMovel);
        const blob = await response.blob();
        
        // Adicionar ao FormData
        formData.append('fotoMovel', blob, 'foto-movel.jpg');
      }

      // 📤 ENVIAR COM FORMDATA
      const response = await fetch(`${baseUrl}/email/reserva`, {
        method: 'POST',
        body: formData, // 👈 FormData, não JSON
        // NÃO definir Content-Type, deixar o browser definir automaticamente
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
