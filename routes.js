import { Router } from "express"
import { jogoCreate, jogoDelete, jogoIndex, jogoUpdate } from "./controllers/jogoController.js"
import { notasCreate, notasDelete, notasIndex } from "./controllers/notasController.js"
import { usuarioCreate, usuarioDelete, usuarioIndex } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middleware/verificaLogin.js"
import { nivelCreate } from "./controllers/nivelController.js"
import {alterarSenha, enviarEmail } from "./controllers/emailController.js"



const router = Router()

// Jogos
router.get('/jogos', jogoIndex)
      .post('/jogos',verificaLogin, jogoCreate)
      .put('/jogos/:id', jogoUpdate)
      .delete('/jogos/:id',verificaLogin,jogoDelete)
// Notas
router.get('/notas', notasIndex)
      .post('/notas',verificaLogin,notasCreate)
      .delete('/notas/:id',verificaLogin,notasDelete)

// Usuarios
router.get('/usuarios',usuarioIndex)
      .post('/usuarios', usuarioCreate)
      .delete('/usuarios/:id', usuarioDelete)

// Nivel
router.post('/nivel',nivelCreate)

// Login
router.post("/usuarios/enviarEmail", enviarEmail)
      .get('/login', loginUsuario)
      .put("/login/alterar", alterarSenha)


export default router