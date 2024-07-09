const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.PORT_API,
  secure: true,
  auth: {
    user: process.env.AUTH_USER_EMAIL_API,
    pass: process.env.AUTH_USER_PASS_API
  },
});

app.post('/api/send-email', upload.single('imagem'), async (req, res) => {
  const { nomeCompleto, cpf, email, telefone, nomeParaPersonalizar, observacoes, produto } = req.body;
  const file = req.file;

  const mailOptions = {
    from: process.env.AUTH_USER_EMAIL_API,
    to: email,
    subject: "Personalização de Produto",
    text: `
      Nome Completo: ${nomeCompleto}
      CPF: ${cpf}
      Email: ${email}
      Telefone: ${telefone}
      Produto: ${produto}
      Nome para Personalizar: ${nomeParaPersonalizar}
      Observações: ${observacoes}
    `,
    html: `
      <p><strong>Nome Completo:</strong> ${nomeCompleto}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Produto:</strong> ${produto}</p>
      <p><strong>Nome para Personalizar:</strong> ${nomeParaPersonalizar}</p>
      <p><strong>Observações:</strong> ${observacoes}</p>
    `,
    attachments: file ? [
      {
        filename: file.originalname,
        content: file.buffer
      }
    ] : []
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.status(200).send('Email enviado com sucesso!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao enviar email');
  }
});

app.get("/", (req, res) => {
  res.json({message: "olá, está é a rota principal.", porta: port});
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
