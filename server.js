const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static(__dirname + '/dist/angular-test'))
app.get('/*', (req, res) => {
  res.sendFile((path.join(__dirname + '/dist/angular-test/index.html')))
})

app.listen(PORT, () => {
  console.log('Your Server is UP')
})
