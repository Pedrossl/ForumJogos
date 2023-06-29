import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';



import * as dotenv from 'dotenv';
dotenv.config();

import { Usuario } from '../models/Usuario.js';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b827fd5419812d",
      pass: "********dc6e"
    }
  });

  

  export const loginUsuario = async (req, res) => { 
    const { user, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { user } });
  
    const enviarEmailTentativasExcedidas = (email) => {
      const mailOptions = {
        from: `"Sr(a) ${user} 👻 esta tendo muitas tentativas incorretas de login com seu usuario em nosso sistema"`,
        to: email,
        subject: "Tentativas de Login Excedidas",
        text: "Você excedeu o número máximo de tentativas de login incorretas. Entre em contato com o suporte para obter assistência.",
      };
  
      transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          console.error(erro);
        } else {
          console.log("Email enviado: " + info.response);
        }
      });
    };
  
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      usuario.tentativasLogin = usuario.tentativasLogin + 1;
      await usuario.save();
      console.log("Número de tentativas: " + usuario.tentativasLogin);
      if (usuario.tentativasLogin >= 3) {
        enviarEmailTentativasExcedidas(usuario.email);
      }
  
      return res.status(401).json({ error: 'Dados Incorretos' });
    } else {
      const token = jwt.sign({ id: usuario.id, nome: usuario.nome, nivel: usuario.nivel }, process.env.JWT_KEY, {
        expiresIn: "1h"
      });
  
      res.status(200).json({ msg: "Liberado", token });
    }
  };
  