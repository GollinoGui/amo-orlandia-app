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
    this.transporter = nodemailer.createTransport({  // 👈 CORRIGIDO: createTransport
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Verificar conexão com o servidor de email
  async verificarConexao(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ Conexão com servidor de email estabelecida');
      return true;
    } catch (error) {
      console.error('❌ Erro na conexão com servidor de email:', error);
      return false;
    }
  }

  // Enviar formulário de política de reserva
  async enviarFormularioReserva(data: EmailData): Promise<boolean> {
    try {
      const htmlContent = this.gerarHTMLReserva(data);
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `🪑 Nova Solicitação de Reserva de Móvel - ${data.nome}`,
        html: htmlContent,
        attachments: data.fotoMovel ? [{
          filename: 'foto-movel.jpg',
          path: data.fotoMovel
        }] : []
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email de reserva enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar email de reserva:', error);
      return false;
    }
  }

  // Enviar formulário de contato
  async enviarFormularioContato(data: ContatoData): Promise<boolean> {
    try {
      const htmlContent = this.gerarHTMLContato(data);
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `📞 Nova Mensagem de Contato - ${data.nome}`,
        html: htmlContent,
        replyTo: data.email || undefined
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email de contato enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar email de contato:', error);
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
            
            ${data.fotoMovel ? `
            <div class="field">
              <span class="label">📷 Foto:</span>
              <span class="value">Anexada ao email</span>
            </div>
            ` : ''}
            
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
