import express from 'express'
import routes from '@/routes/main.routes'

const app = express()

app.use(express.json())
app.use(routes)

export { app }
