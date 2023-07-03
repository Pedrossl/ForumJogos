import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv';
dotenv.config();

export const verificaLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        console.log(decode);
        req.user_logado_id = decode.id
        req.user_logado_nome = decode.nome
        req.user_logado_nivel = decode.nivel
        next();

     } catch(erro){
        return res.status(401).send({msg: "Falha na autenticação"});
     }
 }