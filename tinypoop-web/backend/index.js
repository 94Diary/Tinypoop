const express = require('express')
const cors = require('cors')
const placeRoutes = require('./modules/place/placeRoutes')
//const userRoutes = require('./routes/userRoutes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// เรียกใช้ Routes แบ่งตาม Module
app.use('/places', placeRoutes)
//app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('TinyPoop Web Backend is running!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})