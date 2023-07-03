import { sequelize } from '../databases/conecta.js'
import { Nivel } from '../models/Nivel.js';
import { Usuario } from '../models/Usuario.js'
import bcrypt from 'bcrypt'

export const usuarioIndex = async (req, res) => {

  try {
    const usuarios = await Usuario.findAll({
    });
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).send(error)
  }
}



 export const usuarioCreate = async (req, res) => { 
    
  const { nome, email, user, senha, nivel } = req.body;
    
  if (!nome || !email || !user || !senha || !nivel) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    function validaSenha(senha) {

      const mensa = []
    
      if (senha.length < 8) {
        mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
      }
    
      let pequenas = 0
      let grandes = 0
      let numeros = 0
      let simbolos = 0
    
      for (const letra of senha) {
    
        if ((/[a-z]/).test(letra)) {
          pequenas++
        }
        else if ((/[A-Z]/).test(letra)) {
          grandes++
        }
        else if ((/[0-9]/).test(letra)) {
          numeros++
        } else {
          simbolos++
        }
      }
    
      if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
        mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
      }
    
      return mensa
    }
    
    const mensaValidacao = validaSenha(senha)

  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  } 

    try {
      const emailExiste = await Usuario.findOne({ where : {email} })
      
      if (emailExiste) {
        res.status(400).json({ id: 0, msg: "Erro... Email já cadastrado" })
        return
       }

        const usuario = await Usuario.create({ nome, email, user, senha, nivel });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir o usuario" })
    }
  }

  export const usuarioDelete = async (req, res) => { 
    const id = req.params.id;
    const userLogado = req.user_logado_id;
    console.log("NAO ENTREI AKI");
    if (!id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe o id" })
        return
    }

    try {
        const usuario = await Usuario.destroy({  
            where: {
                id: id
            }
            
        });
        await Log.create({
          descricao: "Jogo deletado" + "Do id: " + id,
          usuario_id: userLogado
        })

        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível deletar o usuario" })
    }
   }
