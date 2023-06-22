import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Nivel } from './models/Nivel.js'
import { Usuario } from './models/Usuario.js'
import { Jogos } from './models/Jogos.js'
import { Nota } from './models/Notas.js'

const app = express()
const port = 3002

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');

    await Nivel.sync({ alter: true});
    await Usuario.sync( { alter: true });
    await Jogos.sync( { alter: true });
    await Nota.sync(  { force: true });
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API Escola de Idiomas')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})