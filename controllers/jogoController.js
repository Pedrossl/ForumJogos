import { sequelize } from '../databases/conecta.js'
import { Jogos } from '../models/Jogos.js';
import { Usuario } from '../models/Usuario.js';
import { Log } from '../models/Log.js';

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
    const userLogado = req.user_logado_id;

    console.log("Nivel: " + userLogado)

    
    if(req.user_logado_nivel > 3){

    if (!nome || !genero || !preco ) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const jogo = await Jogos.create({ nome, genero, preco });
        res.status(200).json(jogo);
        
        await Log.create({
            descricao: "Jogo criado" + "Do id: " + jogo.id,
            usuario_id: userLogado
            })

    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir o jogo" })
    }
    }else{
        res.status(400).json({ id: 0, msg: "Erro... Você não tem permissão para criar jogos" })
    }
 }


export const jogoDelete = async (req, res) => { 
    
    const id = req.params.id;
    const userLogado = req.user_logado_id;
    
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

        await Log.create({
            descricao: "Jogo deletado" + "Do id: " + id,
            usuario_id: userLogado
          })
    
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível deletar o jogo" })
    }
     }


 export const jogoUpdate = async (req, res) => { 
    const id = req.params.id;
    const { nome, genero, preco } = req.body;
    const userLogado = req.user_logado_id;


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

        await Log.create({
            descricao: "Jogo atualizado" + "Do id: " + id,
            usuario_id: userLogado
            })

        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível atualizar o jogo" })
    }
 }    