import { Router } from "express"
import { jogoCreate, jogoIndex } from "./controllers/jogoController.js"
import { notasCreate, notasIndex } from "./controllers/notasController.js"
import { usuarioCreate, usuarioIndex } from "./controllers/usuarioController.js"



const router = Router()

// Jogos
router.get('/jogos', jogoIndex)
      .post('/jogos', jogoCreate)

// Notas
router.get('/notas', notasIndex)
      .post('/notas', notasCreate)

// Usuarios
router.get('/usuarios', usuarioIndex)
      .post('/usuarios', usuarioCreate)


export default router