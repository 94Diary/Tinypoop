const express = require('express')
const cors = require('cors')
const placeRoutes = require('./modules/place/placeRoutes')
const userRoutes = require('./modules/user/userRoutes')
const locateRoutes = require('./modules/Locate/locateRoutes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// เรียกใช้ Routes แบ่งตาม Module
app.use('/places', placeRoutes)
app.use('/users', userRoutes)
app.use('/locates', locateRoutes)



app.get('/', (req, res) => {
  res.send('TinyPoop Web Backend is running!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})