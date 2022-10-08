import { Application } from 'express'

import { app } from './app'

class Server {
  private readonly appServer: Application

  constructor() {
    this.appServer = app

    this.start()
    this.stop()
  }

  private start(): void {
    this.appServer.listen('3333', () => {
      console.info('server started on port 3333')
    })
  }

  private stop(): void {
    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']

    exitSignals.forEach((signal: string) => {
      process.on(signal, () => {
        console.info(`\nClosing server connections due an ${signal} command...`)
        process.exit()
      })
    })
  }
}

export default new Server()
