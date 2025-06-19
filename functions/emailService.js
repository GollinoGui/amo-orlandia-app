const nodemailer = require('nodemailer');
const { defineSecret } = require('firebase-functions/params');

// ✅ Para v2, usar secrets em vez de config
class EmailService {
  constructor() {
    console.log('🔧 [EMAIL] Inicializando EmailService...');
    
    // Para v2, vamos usar variáveis de ambiente por enquanto
    const emailUser = process.env.EMAIL_USER || 'euamoorlandia@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'utmy ybmo mpqh hytz';
    const emailFrom = process.env.EMAIL_FROM || 'AMO Orlandia <euamoorlandia@gmail.com>';
    const emailTo = process.env.EMAIL_TO || 'euamoorlandia@gmail.com';

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    this.emailFrom = emailFrom;
    this.emailTo = emailTo;

    console.log('✅ [EMAIL] Transporter criado com sucesso');
  }

  async verificarConexao() {
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

  async enviarEmailTeste() {
    try {
      console.log('🧪 [EMAIL] Enviando email de teste...');
      
      const mailOptions = {
        from: this.emailFrom,
to: this.emailTo,
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

  async enviarFormularioReserva(data) {
    try {
      console.log('📧 [EMAIL] Enviando formulário de reserva...');
      console.log('📸 [EMAIL] Foto anexada:', data.fotoMovel ? 'SIM' : 'NÃO');
      
      const htmlContent = this.gerarHTMLReserva(data);
      
      const mailOptions = {
        from: this.emailFrom,
to: this.emailTo,
        subject: `🪑 Nova Solicitação de Reserva de Móvel - ${data.nome}`,
        html: htmlContent,
      };

      if (data.fotoMovel) {
        mailOptions.attachments = [{
          filename: `foto-movel-${data.nome.replace(/\s+/g, '-')}.jpg`,
          path: data.fotoMovel,
          cid: 'foto-movel'
        }];
        console.log('📎 [EMAIL] Anexo adicionado:', data.fotoMovel);
      }

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de reserva enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de reserva:', error);
      return false;
    }
  }

  async enviarFormularioContato(data) {
    try {
      console.log('📧 [EMAIL] Iniciando envio de contato...');
      console.log('📧 [EMAIL] Dados recebidos:', JSON.stringify(data, null, 2));
      
      const htmlContent = this.gerarHTMLContato(data);
      console.log('📧 [EMAIL] HTML gerado com sucesso');
      
      const mailOptions = {
        from: this.emailFrom,
to: this.emailTo,
        subject: `📞 Nova Mensagem de Contato - ${data.nome}`,
        html: htmlContent,
        replyTo: data.email || undefined
      };

      console.log('📧 [EMAIL] Opções do email:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        hasReplyTo: !!mailOptions.replyTo
      });

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de contato enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro detalhado ao enviar email de contato:', error);
      return false;
    }
  }

  async enviarFormularioAssociacao(data) {
    try {
      console.log('📧 [EMAIL] Enviando formulário de associação...');
      const htmlContent = this.gerarHTMLAssociacao(data);
      
      const mailOptions = {
        from: this.emailFrom,
to: this.emailTo,
        subject: `🤝 Nova Solicitação de Associação - ${data.nomeCompleto}`,
        html: htmlContent,
        replyTo: data.email
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de associação enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de associação:', error);
      return false;
    }
  }

  async enviarFormularioDenuncia(data) {
    try {
      console.log('🚨 [EMAIL] Enviando formulário de denúncia...');
      console.log('📸 [EMAIL] Fotos anexadas:', data.fotos.length);
      
      const htmlContent = this.gerarHTMLDenuncia(data);
      
      const mailOptions = {
        from: this.emailFrom,
to: this.emailTo,
        subject: `🚨 Nova Denúncia de Descarte Irregular - ${data.nomeCompleto}`,
        html: htmlContent,
        replyTo: data.email
      };

      // ANEXAR FOTOS SE EXISTIREM
      if (data.fotos.length > 0) {
        mailOptions.attachments = data.fotos.map((foto, index) => ({
          filename: `denuncia-foto-${index + 1}.jpg`,
          path: foto,
          cid: `foto-denuncia-${index + 1}`
        }));
        console.log('📎 [EMAIL] Anexos adicionados:', data.fotos.length);
      }

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Email de denúncia enviado:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar email de denúncia:', error);
      return false;
    }
  }

  gerarHTMLReserva(data) {
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

  gerarHTMLContato(data) {
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
            <span class="label">🏷️ Assunto:</span>
            <span class="value">${data.assunto}</span>
          </div>
          <div class="field">
            <span class="label">💬 Mensagem:</span>
            <div class="message">${data.mensagem.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="highlight">
            <strong>Este assunto já recebeu <span style="color:#F2C335">${data.totalAssunto}</span> mensagem(ns).</strong>
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

  gerarHTMLAssociacao(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #9EBF26; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #9EBF26; }
          .value { margin-left: 10px; }
          .highlight { background: #f0f8e8; padding: 10px; border-left: 4px solid #9EBF26; margin: 15px 0; }
          .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #9EBF26; }
        </style>
      </head>
      <body>
                <div class="container">
          <div class="header">
            <h1>🤝 Nova Solicitação de Associação</h1>
            <p>AMO Orlândia - Formulário de Associação</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
            
            <div class="section">
              <h3>👤 Dados Pessoais</h3>
              <div class="field">
                <span class="label">Nome Completo:</span>
                <span class="value">${data.nomeCompleto}</span>
              </div>
              <div class="field">
                <span class="label">Data de Nascimento:</span>
                <span class="value">${data.dataNascimento}</span>
              </div>
              <div class="field">
                <span class="label">Telefone:</span>
                <span class="value">${data.telefone}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${data.email}</span>
              </div>
            </div>
            
            <div class="section">
              <h3>📍 Endereço</h3>
              <div class="field">
                <span class="value">${data.enderecoCompleto}</span>
              </div>
            </div>
            
            <div class="section">
              <h3>💼 Informações Profissionais</h3>
              <div class="field">
                <span class="label">Profissão:</span>
                <span class="value">${data.profissao}</span>
              </div>
            </div>
            
            <div class="section">
              <h3>💭 Motivação</h3>
              <div class="field">
                <span class="label">Motivo para se associar:</span>
                <div class="value">${data.motivoAssociacao.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <span class="label">Como conheceu a AMO:</span>
                <span class="value">${data.comoConheceu}</span>
              </div>
            </div>
            
            <div class="highlight">
              <strong>⚠️ Ação Necessária:</strong> Analisar solicitação e entrar em contato para próximos passos.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  gerarHTMLDenuncia(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #E74C3C; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #E74C3C; }
          .value { margin-left: 10px; }
          .highlight { background: #ffebee; padding: 10px; border-left: 4px solid #E74C3C; margin: 15px 0; }
          .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #E74C3C; }
          .urgent { background: #ffcdd2; padding: 15px; border-radius: 5px; text-align: center; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Nova Denúncia de Descarte Irregular</h1>
            <p>AMO Orlândia - Sistema de Denúncias</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              ⚠️ DENÚNCIA URGENTE - REQUER AÇÃO IMEDIATA ⚠️
            </div>
            
            <div class="highlight">
              <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
            
            <div class="section">
              <h3>🚨 Dados da Denúncia</h3>
              <div class="field">
                <span class="label">Tipo:</span>
                <span class="value">${data.tipo}</span>
              </div>
              <div class="field">
                <span class="label">Descrição:</span>
                <div class="value">${data.descricao.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <span class="label">Endereço:</span>
                <span class="value">${data.endereco}</span>
              </div>
              ${data.coordenadas ? `
              <div class="field">
                <span class="label">Coordenadas GPS:</span>
                <span class="value">Lat: ${data.coordenadas.latitude}, Lng: ${data.coordenadas.longitude}</span>
              </div>
              ` : ''}
              ${data.fotos.length > 0 ? `
              <div class="field">
                <span class="label">Fotos:</span>
                <span class="value">${data.fotos.length} foto(s) anexada(s)</span>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
              <h3>👤 Dados do Denunciante</h3>
              <div class="field">
                <span class="label">Nome:</span>
                <span class="value">${data.nomeCompleto}</span>
              </div>
              <div class="field">
                <span class="label">Telefone:</span>
                <span class="value">${data.telefone}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${data.email}</span>
              </div>
            </div>
            
            <div class="highlight">
              <strong>⚠️ Ação Necessária:</strong> Verificar local e tomar providências para remoção do descarte irregular.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();

