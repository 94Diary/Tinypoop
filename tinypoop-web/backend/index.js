const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

//  สร้าง adapter สำหรับ Prisma 7
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

// Test route
app.get('/', (req, res) => {
  res.send('TinyPoop Web Backend is running!')
})

//  ดึงข้อมูล Place ทั้งหมด
app.get('/places', async (req, res) => {
  try {
    const places = await prisma.place.findMany()
    res.json(places)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(port, () => {
  console.log(`Web Backend listening at http://localhost:${port}`)
})