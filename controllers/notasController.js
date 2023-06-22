import { sequelize } from '../databases/conecta.js'
import { Jogos } from '../models/Jogos.js';
import { Nota } from '../models/Notas.js';


export const notasIndex = async (req, res) => {

    try {
      const nota = await Nota.findAll({
        include: Jogos
      });
      res.status(200).json(nota)
    } catch (error) {
      res.status(400).send(error)
    }
  }

export const notasCreate = async (req, res) => {

    const { nota, jogo_id, usuario_id } = req.body;
    
    if (!nota || !jogo_id || !usuario_id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    const t = await sequelize.transaction();

    try { 
        const notacao = await Nota.create({ nota, jogo_id, usuario_id }, { transaction: t });

        await Jogos.increment('notaTotal', { by: notacao.nota, where: { id: jogo_id }, transaction: t });  
        
        await Jogos.increment('numeroVotos', { by: 1, where: { id: jogo_id }, transaction: t });

        await t.commit();

        res.status(200).json(notacao);
    } catch (error) {
        await t.rollback();
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir a nota" })
    
    
    }
}

export const notasDelete = async (req, res) => {
    const id = req.params.id;
   
    const t = await sequelize.transaction();

    try { 
        const notacao = await Nota.findByPk(id);

        await Jogos.decrement('notaTotal', { by: notacao.nota, where: { id: notacao.jogo_id }, transaction: t });  
        
        await Jogos.decrement('numeroVotos', { by: 1, where: { id: notacao.jogo_id }, transaction: t });

        await Nota.destroy({ where: { id: id }, transaction: t });

        await t.commit();

        res.status(200).json(notacao);
     } catch (error) {
        await t.rollback();
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível deletar a nota" })
      }
 }