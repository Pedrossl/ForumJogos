import { sequelize } from '../databases/conecta.js'
import { Jogos } from '../models/Jogos.js';
import { Usuario } from '../models/Usuario.js';

export const jogoIndex = async (req, res) => {
    
    try {
        const jogos = await Jogos.findAll(
            {include:Usuario }
        );
        res.status(200).json(jogos)
    } catch (error) {
        res.status(400).send(error)
    }  
}

export const jogoCreate = async (req, res) => { 
    const { nome, genero, preco,usuario_id } = req.body;
    
    if (!nome || !genero || !preco || !usuario_id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const jogo = await Jogos.create({ nome, genero, preco,usuario_id });
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir o jogo" })
    }
 }