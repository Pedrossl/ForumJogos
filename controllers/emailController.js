import nodemailer from "nodemailer";
import md5 from "md5";
import bcrypt from "bcrypt";

import { Usuario } from "../models/Usuario.js";
  
let valorAleatorio = null

async function conteudoEmail(name, email, hash) {

valorAleatorio = Math.floor(Math.random() * 10000) + 1;
console.log(valorAleatorio);

let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "1d9a1736d17eb0",
        pass: "12bb9d66ca9181"
    }
    });


	let mensa = "<h5>Nosso forum</h5>"
	mensa += `<h6>Usuario: ${name} </h6>`
	mensa += "<h6>Você solicitou a troca de senha. Sua chave é: " + valorAleatorio + "</h6>"

  let info = await transporter.sendMail({
    from: '"From Notas Brasil" <NotasBrasil@ritogames.com>',
    to: email,
    subject: "Solicitação de Alteração de Senha",
    text: `Copie e cole o endereço:`,
    html: mensa,
  });

  console.log("Email enviado")

}

export const enviarEmail = async (req, res) => {
	const { email} = req.body

	if (!email) {
		res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
		return
	  }

	try {
	  const usuario = await Usuario.findOne({ where: { email } })

	  if (usuario == null) {
		res.status(400).json({ erro: "Erro... E-mail invalido" })
		return
	  }

	  const hash = md5(usuario.name + email + Date.now())
	  await conteudoEmail(usuario.name, email, hash);

	  res.status(200).json({ msg: "ok. Email para alteração enviado com sucesso!" })
	  console.log(valorAleatorio);

  }catch (error) {
    res.status(400).json(error)
  }
}

export const alterarSenha = async (req, res) => {
	const { email, novaSenha, numero } = req.body;
	console.log("Valor Aleatório:", valorAleatorio);
	console.log("Número fornecido:", numero);
  
	if (!email || !novaSenha || !numero) {
	  res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
	  return;
	}
  
	try {
	  const usuario = await Usuario.findOne({ where: { email } });
  
	  if (usuario == null) {
		res.status(400).json({ erro: "Erro... E-mail inválido" });
		return;
	  }
  
	  if (numero !== valorAleatorio) {
		console.log("Valores não correspondem!");
		console.log("Número fornecido:", numero);
		console.log("Valor Aleatório:", valorAleatorio);
		res.status(400).json({ erro: "Erro... Número incorreto" });
		return;
	  }
	  const hashedSenha = await bcrypt.hash(novaSenha, 10);
	  usuario.senha = hashedSenha;
	  usuario.save();

	  //usuario.senha = novaSenha;
	  //usuario.save();
  
	  res.status(200).json({ msg: "ok. Senha alterada com sucesso!" });
	} catch (error) {
	  console.log("Erro ao alterar senha:", error);
	  res.status(400).json({ erro: "Erro... Não foi possível alterar a senha" });
	}
  };
  
  
