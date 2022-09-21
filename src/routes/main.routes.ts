import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'hello world'})
})

routes.post('/', (request: Request, response: Response) => {
  const { email, password } = request.body

  let status = `usuário ${email} não logado`
  
  if(password === '1234') {
    status = `usuário ${email} logado`
  }

  return response.json({ status })
})

routes.put('/:id', (request: Request, response: Response) => {
  // Atualização em massa (vários dados)
  const { id } = request.params

  return response.json({ message: `Item ID:${id} atualizado` })
})

routes.patch('/:id', (request: Request, response: Response) => {
  // Atualização pontual (único dado)
  const { id } = request.params
  const { user } = request.query
  const { name } = request.body

  console.log('id:', id)
  console.log('user:', user)
  console.log('name', name)
  console.log('')

  return response.json({ 
    message: `Item id:${id} atualizado com nome ${name}`,
    user 
  })
})

routes.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params
  console.log(`Delete no banco de dados com ID:${id}`)
  
  return response.status(204).send()
})

export default routes
