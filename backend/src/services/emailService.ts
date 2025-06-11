import nodemailer from 'nodemailer';

interface EmailData {
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

class EmailService {
  private transporter;

  constructor() {
    console.log('🔧 [EMAIL] Inicializando EmailService...');
    
    // 🔍 DIAGNÓSTICO DETALHADO
    console.log('🔍 [EMAIL] Credenciais:');
    console.log('  - EMAIL_USER:', process.env.EMAIL_USER || '❌ NÃO DEFINIDO');
    console.log('  - EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ DEFINIDO' : '❌ NÃO DEFINIDO');
    console.log('  - EMAIL_HOST:', process.env.EMAIL_HOST || '❌ NÃO DEFINIDO');
    console.log('  - EMAIL_PORT:', process.env.EMAIL_PORT || '❌ NÃO DEFINIDO');

    // Verificar se as credenciais existem
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ [EMAIL] ERRO: Credenciais de email não configuradas!');
      console.error('❌ [EMAIL] Verifique se o arquivo .env existe em backend/.env');
      throw new Error('Credenciais de email não configuradas');
    }

    // 🔧 CONFIGURAÇÃO MAIS ROBUSTA
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true
    });

    console.log('✅ [EMAIL] Transporter criado com sucesso');
  }

  // Verificar conexão com o servidor de email
  async verificarConexao(): Promise<boolean> {
    try {
      console.log('🧪 [EMAIL] Verificando conexão...');
      
      await this.transporter.verify();
      console.log('✅ [EMAIL] Conexão estabelecida com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro na conexão:', error);
      return false;
    }
  }

  // 🧪 MÉTODO DE TESTE SIMPLES
  async enviarEmailTeste(): Promise<boolean> {
    try {
      console.log('🧪 [EMAIL] Enviando email de teste...');
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: '🧪 Teste AMO Orlândia - ' + new Date().toLocaleString('pt-BR'),
        html: `
          <h2>🧪 Email de Teste</h2>
          <p>Este é um email de teste do sistema AMO Orlândia.</p>
          <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          <p><strong>Status:</strong> ✅ Sistema funcionando!</p>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de teste enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de teste:', error);
      return false;
    }
  }

  // Enviar formulário de política de reserva
  async enviarFormularioReserva(data: EmailData): Promise<boolean> {
    try {
      console.log('📧 [EMAIL] Enviando formulário de reserva...');
      const htmlContent = this.gerarHTMLReserva(data);
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `🪑 Nova Solicitação de Reserva de Móvel - ${data.nome}`,
        html: htmlContent,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de reserva enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de reserva:', error);
      return false;
    }
  }

  // Enviar formulário de contato
  async enviarFormularioContato(data: ContatoData): Promise<boolean> {
    try {
      console.log('📧 [EMAIL] Enviando formulário de contato...');
      const htmlContent = this.gerarHTMLContato(data);
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `📞 Nova Mensagem de Contato - ${data.nome}`,
        html: htmlContent,
        replyTo: data.email || undefined
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de contato enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de contato:', error);
      return false;
    }
  }

  // Gerar HTML para email de reserva
  private gerarHTMLReserva(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #39BF24; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #39BF24; }
          .value { margin-left: 10px; }
          .highlight { background: #e8f5e8; padding: 10px; border-left: 4px solid #39BF24; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🪑 Nova Solicitação de Reserva de Móvel</h1>
            <p>AMO Orlândia - Política de Reserva</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
            
            <div class="field">
              <span class="label">👤 Nome:</span>
              <span class="value">${data.nome}</span>
            </div>
            
            <div class="field">
              <span class="label">📱 Telefone:</span>
              <span class="value">${data.telefone}</span>
            </div>
            
            ${data.telefoneContato ? `
            <div class="field">
              <span class="label">📞 Telefone de Contato:</span>
              <span class="value">${data.telefoneContato}</span>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">📍 Endereço:</span>
              <span class="value">${data.endereco}</span>
            </div>
            
            <div class="field">
              <span class="label">⏰ Dias de Espera:</span>
              <span class="value">${data.diasEspera}</span>
            </div>
            
            <div class="field">
              <span class="label">💝 Apto para Doação:</span>
              <span class="value">${data.aptoDoacao}</span>
            </div>
            
            <div class="highlight">
              <strong>⚠️ Ação Necessária:</strong> Entre em contato com o solicitante para agendar a retirada do móvel.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Gerar HTML para email de contato
  private gerarHTMLContato(data: ContatoData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F2C335; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #F2C335; }
          .value { margin-left: 10px; }
          .message { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #F2C335; }
          .highlight { background: #fff3cd; padding: 10px; border-left: 4px solid #F2C335; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📞 Nova Mensagem de Contato</h1>
            <p>AMO Orlândia - Formulário de Contato</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
            
            <div class="field">
              <span class="label">👤 Nome:</span>
              <span class="value">${data.nome}</span>
            </div>
            
            <div class="field">
              <span class="label">📱 Telefone:</span>
              <span class="value">${data.telefone}</span>
            </div>
            
            ${data.email ? `
            <div class="field">
              <span class="label">📧 Email:</span>
              <span class="value">${data.email}</span>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">💬 Mensagem:</span>
              <div class="message">${data.mensagem.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="highlight">
              <strong>⚠️ Ação Necessária:</strong> Responder ao contato do solicitante.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default new EmailService();
