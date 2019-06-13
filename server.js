const express = require('express')

const app = express()

// ... other imports
const path = require('path')

// ... other app.use middleware
app.use(express.static(path.join(__dirname, 'app', 'build')))

// ...
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'))
})

app.listen(3000, () => {})
