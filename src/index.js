import express from 'express'
import { PORT, originsAllowed } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import rolesRoutes from './routes/roles.routes.js'

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  const { origin } = req.headers

  if (originsAllowed.includes(origin) || origin === undefined) {
    res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
    next()
  }
})

app.use('/api/usuarios/', usuariosRoutes)
app.use('/api/roles/', rolesRoutes)

app.listen(PORT, () => console.log(`Application on http://localhost:${PORT}`))
