import http from 'http'
import { env, mongo, port, ip, apiRoot } from './src/config'
import mongoose from './src/services/mongoose'
import express from './src/services/express'
import api from './src/api'
const path = require('path')
global.appRoot = path.resolve(__dirname)

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri, { useNewUrlParser: true })
mongoose.Promise = Promise

// ...
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'))
})

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      env
    )
  })
})

export default app
