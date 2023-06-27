import { Router } from "express"
import { jogoCreate, jogoIndex } from "./controllers/jogoController.js"
import { notasCreate, notasDelete, notasIndex } from "./controllers/notasController.js"
import { usuarioCreate, usuarioDelete, usuarioIndex } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middleware/verificaLogin.js"



const router = Router()

// Jogos
router.get('/jogos', jogoIndex)
      .post('/jogos',verificaLogin, jogoCreate)

// Notas
router.get('/notas', notasIndex)
      .put('/notas',verificaLogin,notasCreate)
      .delete('/notas/:id',notasDelete)

// Usuarios
router.get('/usuarios',usuarioIndex)
      .post('/usuarios', usuarioCreate)
      .delete('/usuarios/:id', usuarioDelete)




router.get('/login', loginUsuario)


export default router