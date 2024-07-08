const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.configDotenv();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'guizaorocha543@gmail.com',
    pass: 'ykul ezxp livs yliu'
  },
});

app.post('/api/send-email', upload.single('imagem'), async (req, res) => {
  const { nomeCompleto, cpf, telefone, nomeParaPersonalizar, observacoes, produto } = req.body;
  const file = req.file;

  const mailOptions = {
    from: "guizaorocha543@gmail.com",
    to: "guizaorocha5432@gmail.com",
    subject: "Personalização de Produto",
    text: `
      Nome Completo: ${nomeCompleto}
      CPF: ${cpf}
      Telefone: ${telefone}
      Produto: ${produto}
      Nome para Personalizar: ${nomeParaPersonalizar}
      Observações: ${observacoes}
    `,
    html: `
      <p><strong>Nome Completo:</strong> ${nomeCompleto}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
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
  res.json({"message": "olá, está é a rota principal."});
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
