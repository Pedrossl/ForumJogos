import { Nivel } from "../models/Nivel.js";

export const nivelCreate = async (req, res) => {
    const { nome, id } = req.body;

    if (!nome || !id) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const nivel = await Nivel.create({ nome, id });
        res.status(200).json(nivel);
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro... Não foi possível inserir o nivel" })
    }
        
}