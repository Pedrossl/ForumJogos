import { sequelize } from '../databases/conecta.js'
import { Jogos } from '../models/Jogos.js';
import { Usuario } from '../models/Usuario.js';

export const jogoIndex = async (req, res) => {
    
    try {
        const jogos = await Jogos.findAll(
        );
        res.status(200).json(jogos)
    } catch (error) {
        res.status(400).send(error)
    }  
}

export const jogoCreate = async (req, res) => { 
    const { nome, genero, preco} = req.body;

    console.log("Nivel: " + req.user_logado_nivel)

    
    if(req.user_logado_nivel > 3){

    if (!nome || !genero || !preco ) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const jogo = await Jogos.create({ nome, genero, preco });
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir o jogo" })
    }
    }else{
        res.status(400).json({ id: 0, msg: "Erro... Você não tem permissão para criar jogos" })
    }
 }

 export const jogoDelete = async (req, res) => {
    const id = req.params.id;
    
    if(req.user_logado_nivel > 3){
    
    if (!id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe o id" })
        return
    }

    try {
        const jogo = await Jogos.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível deletar o jogo" })
    }
  } else {
    res.status(400).json({ id: 0, msg: "Erro... Você não tem permissão para deletar jogos" })
  }
 }

 export const jogoUpdate = async (req, res) => { 
    const id = req.params.id;
    const { nome, genero, preco } = req.body;


    if (!id || !nome || !genero || !preco ) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const jogo = await Jogos.update({ nome, genero, preco }, {
            where: {
                id: id
            },
            individualHooks: true
        });
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível atualizar o jogo" })
    }
 }    