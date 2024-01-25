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

const port = Number(process.env.PORT) || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

/**
 * Run the server!
 */
const start = async () => {
  try {

    await server.listen({ port, host })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()