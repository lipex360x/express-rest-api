import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'hello world'})
})

routes.post('/', (request: Request, response: Response) => {
  const { email, password } = request.body

  console.log(email, password)
  
  let status = 'não logado'
  
  if(password === '1234') {
    status = 'logado'
  }

  return response.json({ status })
})

routes.put('/:id', (request: Request, response: Response) => {

  const { id } = request.params
  const { user } = request.query
  const { name } = request.body

  console.log(id)
  console.log(user)
  console.log(name)

  response.json({ id })
})

routes.patch('/:id', (request: Request, response: Response) => {

  const { id } = request.params
  const { user } = request.query
  const { name } = request.body

  console.log(id)
  console.log(user)
  console.log(name)

  response.json({ id })
})

routes.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params
  console.log(id)
  
  return response.json({ message: 'hello world'})
})



export default routes