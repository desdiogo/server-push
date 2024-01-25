import webPush from 'web-push'
import { FastifyInstance } from 'fastify'
import z from 'zod'

const publicKey = 'BA30pjoKq1Zymcw6V-wr7h0_NF8utGrmFLOvENyNR3U6IGXNw0SD8J-nXCWYwWnId7GVx13fbgUC-kfR0oTY-K8'
const privateKey = 'rrYW8nOBRx1K6lMWNwqbQBPkuMfg0dV-zSlW4m7jhUM'

webPush.setVapidDetails('http://localhost:3000', publicKey, privateKey)

export async function notificationRoutes(server: FastifyInstance) {
  server.get('/push/public_key', () => {
    return {
      publicKey
    }
  })

  server.post('/push/register', (request, reply) => {
    console.log(request.body)

    reply.send(201).send()
  })

  server.post('/push/send', async (request, reply) => {
    const sendBushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      }),
      title: z.string(),
      body: z.string()
    })

    const { subscription, title, body } = sendBushBody.parse(request.body)
    const notification = { title, body }

    webPush.sendNotification(subscription, Buffer.from(JSON.stringify(notification)))

    reply.send(201)
  })
}