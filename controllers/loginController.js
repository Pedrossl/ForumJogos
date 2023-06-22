import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import * as dotenv from 'dotenv';
dotenv.config();

import { Usuario } from '../models/Usuario.js';

export const loginUsuario = async (req, res) => { 
    const { user, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { user } });
    
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(401).json({ error: 'Dados Incorretos' });
    } else {
        const token = jwt.sign({ id: usuario.id , nome: usuario.nome}, process.env.JWT_KEY, {
        expiresIn: "1h"
        });
        
        res.status(200).json({ msg: "Liberado" ,token });
    }
}