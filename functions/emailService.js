const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    console.log('🔧 [EMAIL] Inicializando EmailService...');
    
    // Configurações do email
    this.emailConfig = {
      user: process.env.EMAIL_USER || 'euamoorlandia@gmail.com',
      pass: process.env.EMAIL_PASS || 'utmy ybmo mpqh hytz',
      from: process.env.EMAIL_FROM || 'AMO Orlandia <euamoorlandia@gmail.com>',
      to: process.env.EMAIL_TO || 'euamoorlandia@gmail.com'
    };
    
    // ✅ CORREÇÃO: createTransport (sem 'er' no final)
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.emailConfig.user,
        pass: this.emailConfig.pass
      }
    });
    
    console.log('✅ [EMAIL] EmailService inicializado');
  }
  
  // 🧪 TESTAR CONEXÃO
  async testarConexao() {
    try {
      console.log('🧪 [EMAIL] Testando conexão...');
      await this.transporter.verify();
      console.log('✅ [EMAIL] Conexão OK');
      return true;
    } catch (error) {
      console.error('❌ [EMAIL] Erro na conexão:', error);
      return false;
    }
  }
  
  // 📧 MÉTODO GENÉRICO PARA ENVIAR EMAIL
  async enviarEmail(assunto, htmlContent, anexos = []) {
    try {
      const mailOptions = {
        from: this.emailConfig.from,
        to: this.emailConfig.to,
        subject: assunto,
        html: htmlContent
      };
      
      if (anexos.length > 0) {
        mailOptions.attachments = anexos;
      }
      
      console.log('📤 [EMAIL] Enviando:', assunto);
      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ [EMAIL] Enviado:', result.messageId);
      return true;
      
    } catch (error) {
      console.error('❌ [EMAIL] Erro ao enviar:', error);
      return false;
    }
  }
  
  // 🪑 FORMULÁRIO DE RESERVA
  async enviarFormularioReserva(data) {
    console.log('🪑 [EMAIL] Processando reserva...');
    
    const assunto = `🪑 Nova Reserva de Móvel - ${data.nome}`;
    const html = this.gerarHTMLReserva(data);
    
    return await this.enviarEmail(assunto, html);
  }
  
  // 📞 FORMULÁRIO DE CONTATO
  async enviarFormularioContato(data) {
    console.log('📞 [EMAIL] Processando contato...');
    
    const assunto = `📞 Nova Mensagem - ${data.nome}`;
    const html = this.gerarHTMLContato(data);
    
    return await this.enviarEmail(assunto, html);
  }
  
  // 🤝 FORMULÁRIO DE ASSOCIAÇÃO
  async enviarFormularioAssociacao(data) {
    console.log('🤝 [EMAIL] Processando associação...');
    
    const assunto = `🤝 Nova Associação - ${data.nomeCompleto}`;
    const html = this.gerarHTMLAssociacao(data);
    
    return await this.enviarEmail(assunto, html);
  }
  
  // 🚨 FORMULÁRIO DE DENÚNCIA
  async enviarFormularioDenuncia(data) {
    console.log('🚨 [EMAIL] Processando denúncia...');
    
    const assunto = `🚨 Nova Denúncia - ${data.nomeCompleto}`;
    const html = this.gerarHTMLDenuncia(data);
    
    // Preparar anexos (fotos)
    const anexos = data.fotos.map((foto, index) => ({
      filename: `denuncia-foto-${index + 1}.jpg`,
      path: foto,
      cid: `foto-${index + 1}`
    }));
    
    return await this.enviarEmail(assunto, html, anexos);
  }
  
  // 🎨 TEMPLATE BASE PARA EMAILS
  gerarTemplateBase(titulo, cor, conteudo) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: ${cor};
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid ${cor};
          }
          .label {
            font-weight: bold;
            color: ${cor};
            display: block;
            margin-bottom: 5px;
          }
          .value {
            color: #555;
          }
          .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .timestamp {
            background: #e9ecef;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            color: #495057;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${titulo}</h1>
            <p>AMO Orlândia - Sistema de Formulários</p>
          </div>
          
          <div class="timestamp">
            📅 Recebido em: ${new Date().toLocaleString('pt-BR')}
          </div>
          
          <div class="content">
            ${conteudo}
          </div>
          
          <div class="footer">
            <p>Este email foi gerado automaticamente pelo sistema AMO Orlândia</p>
            <p>📧 euamoorlandia@gmail.com | 🌐 www.amoorlandia.org.br</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  // 🪑 HTML PARA RESERVA
  gerarHTMLReserva(data) {
    const conteudo = `
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
      
      <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>⚠️ Ação Necessária:</strong> Entrar em contato para agendar retirada do móvel.
      </div>
    `;
    
    return this.gerarTemplateBase('🪑 Nova Reserva de Móvel', '#39BF24', conteudo);
  }
  
  // 📞 HTML PARA CONTATO
  gerarHTMLContato(data) {
    const conteudo = `
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
        <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.mensagem}</div>
      </div>
      
      <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>⚠️ Ação Necessária:</strong> Responder ao contato do solicitante.
      </div>
    `;
    
    return this.gerarTemplateBase('📞 Nova Mensagem de Contato', '#F2C335', conteudo);
  }
  
  // 🤝 HTML PARA ASSOCIAÇÃO
  gerarHTMLAssociacao(data) {
    const conteudo = `
      <h3 style="color: #9EBF26; margin-bottom: 20px;">👤 Dados Pessoais</h3>
      
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
      
      <h3 style="color: #9EBF26; margin: 30px 0 20px 0;">📍 Endereço</h3>
      
      <div class="field">
        <span class="value">${data.enderecoCompleto}</span>
      </div>
      
      <h3 style="color: #9EBF26; margin: 30px 0 20px 0;">💼 Informações Profissionais</h3>
      
      <div class="field">
        <span class="label">Profissão:</span>
        <span class="value">${data.profissao}</span>
      </div>
      
      <h3 style="color: #9EBF26; margin: 30px 0 20px 0;">💭 Motivação</h3>
      
      <div class="field">
        <span class="label">Motivo para se associar:</span>
        <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.motivoAssociacao}</div>
      </div>
      
      <div class="field">
        <span class="label">Como conheceu a AMO:</span>
        <span class="value">${data.comoConheceu}</span>
      </div>
      
      <div style="background: #f0f8e8; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>⚠️ Ação Necessária:</strong> Analisar solicitação e entrar em contato para próximos passos.
      </div>
    `;
    
    return this.gerarTemplateBase('🤝 Nova Solicitação de Associação', '#9EBF26', conteudo);
  }
  
  // 🚨 HTML PARA DENÚNCIA
  gerarHTMLDenuncia(data) {
    const conteudo = `
      <div style="background: #ffcdd2; padding: 15px; border-radius: 5px; text-align: center; font-weight: bold; margin-bottom: 20px;">
        ⚠️ DENÚNCIA URGENTE - REQUER AÇÃO IMEDIATA ⚠️
      </div>
      
      <h3 style="color: #E74C3C; margin-bottom: 20px;">🚨 Dados da Denúncia</h3>
      
      <div class="field">
        <span class="label">Tipo:</span>
        <span class="value">${data.tipo}</span>
      </div>
      
      <div class="field">
        <span class="label">Descrição:</span>
        <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.descricao}</div>
      </div>
      
      <div class="field">
        <span class="label">Endereço:</span>
        <span class="value">${data.endereco}</span>
      </div>
      
            ${data.coordenadas ? `
      <div class="field">
        <span class="label">📍 Coordenadas GPS:</span>
        <span class="value">Latitude: ${data.coordenadas.latitude}, Longitude: ${data.coordenadas.longitude}</span>
      </div>
      ` : ''}
      
      ${data.fotos.length > 0 ? `
      <div class="field">
        <span class="label">📸 Fotos:</span>
        <span class="value">${data.fotos.length} foto(s) anexada(s)</span>
      </div>
      ` : ''}
      
      <h3 style="color: #E74C3C; margin: 30px 0 20px 0;">👤 Dados do Denunciante</h3>
      
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
      
      <div style="background: #ffebee; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>⚠️ Ação Necessária:</strong> Verificar local e tomar providências para remoção do descarte irregular.
      </div>
    `;
    
    return this.gerarTemplateBase('🚨 Nova Denúncia de Descarte Irregular', '#E74C3C', conteudo);
  }
}

// Exportar instância única
module.exports = new EmailService();

