import app from './app'

class Server {
  execute(): void {
    const api = app.listen('3333', () => {
      console.info('server started on port 3333')
    })

    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']

    exitSignals.forEach((signal: string) => {
      process.on(signal, () => {
        console.info(`\nClosing server connections due an ${signal} command...`)
        api.close()
      })
    })
  }
}

export default new Server().execute()
