import { join } from 'node:path'

import Fastify from 'fastify'
import autoLoad from '@fastify/autoload'
import { notificationRoutes } from './notification-routes'
import { readFileSync } from 'node:fs'
import cors from '@fastify/cors'


const server = Fastify({
  logger: true,
  // https: {
  //   key: readFileSync('./server.key'),
  //   cert: readFileSync('./server.crt')
  // }
})
server.register(cors, {
  origin: ["http://localhost:5173"],
  credentials: true
})
server.register(notificationRoutes)

/**
 * Run the server!
 */
const start = async () => {
  try {

    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()