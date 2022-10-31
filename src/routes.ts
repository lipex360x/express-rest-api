import csvToJson from 'convert-csv-to-json'
import excelToJson from 'convert-excel-to-json'
import { Request, Response, Router } from 'express'
import fs from 'fs-extra'
import multer from 'multer'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'hello world' })
})

routes.post('/', (request: Request, response: Response) => {
  const { email, password } = request.body

  let status = `usuário ${email} não logado`

  if (password === '1234') {
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

  console.log(request.headers)

  return response.json({
    message: `Item id:${id} atualizado com nome ${name}`,
    user,
  })
})

routes.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params
  console.log(`Delete no banco de dados com ID:${id}`)

  return response.status(204).send()
})

const upload = multer({ dest: 'temp' })

routes.post('/xls', upload.single('file'), async (request: Request, response: Response) => {
  try {
    if (request.file.filename === null || request.file.filename === 'undefined')
      return response.status(400).send()

    const filePath = 'temp/' + request.file.filename
    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      // columnToKey: {
      //   "*": "{{columnHeader}}"
      // }
    })

    await fs.remove(filePath)
    return response.json(excelData)
  } catch (error) {
    response.status(500).send(error)
  }
})

routes.post('/csv', upload.single('file'), async (request: Request, response: Response) => {
  try {
    if (request.file.filename === null || request.file.filename === 'undefined')
      return response.status(400).send()

    const filePath = 'temp/' + request.file.filename
    const csvLatin = csvToJson.latin1Encoding().getJsonFromCsv(filePath)
    const csvUtf8 = csvToJson.utf8Encoding().getJsonFromCsv(filePath)

    console.log(csvLatin)
    console.log(csvUtf8)

    await fs.remove(filePath)
    return response.json(csvLatin)
  } catch (error) {
    response.status(500).send(error)
  }
})

export { routes }
