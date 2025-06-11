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

class ApiService {
  // Enviar formulário de reserva de móveis
  async enviarFormularioReserva(data: FormularioReservaData): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData();
      
      // Adicionar campos de texto
      formData.append('nome', data.nome);
      formData.append('telefone', data.telefone);
      if (data.telefoneContato) formData.append('telefoneContato', data.telefoneContato);
      formData.append('endereco', data.endereco);
      formData.append('diasEspera', data.diasEspera);
      formData.append('aptoDoacao', data.aptoDoacao);
      
      // Adicionar foto se existir
      if (data.fotoMovel) {
        const response = await fetch(data.fotoMovel);
        const blob = await response.blob();
        formData.append('fotoMovel', blob, 'foto-movel.jpg');
      }

      const response = await fetch(`${API_BASE_URL}/email/reserva`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar formulário de reserva:', error);
      return { success: false, message: 'Erro de conexão. Tente novamente.' };
    }
  }

  // Enviar formulário de contato
  async enviarFormularioContato(data: FormularioContatoData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/email/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar formulário de contato:', error);
      return { success: false, message: 'Erro de conexão. Tente novamente.' };
    }
  }

  // Testar conexão com o backend
  async testarConexao(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const result = await response.json();
      return result.status === 'OK';
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      return false;
    }
  }
}

export default new ApiService();
