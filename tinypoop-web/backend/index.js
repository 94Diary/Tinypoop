const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
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

//  สร้าง Place ใหม่
app.post('/places', async (req, res) => {
  try {
    const { place_id, name, address, description, create_by } = req.body
    const newPlace = await prisma.place.create({
      data: {
        place_id,
        name,
        address,
        description,
        create_by,
      },
    })
    res.status(201).json(newPlace)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create place' })
  }
})

// ลบข้อมูล Place ตาม ID
app.delete('/places/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.place.delete({
      where: { id: id },
    })
    res.json({ message: 'Place deleted successfully' })
  } catch (error) {
    console.error(error)
    // กรณีไม่พบข้อมูลที่จะลบ Prisma จะโยน error ออกมา
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Place not found' })
    }
    res.status(500).json({ error: 'Failed to delete place' })
  }
})

app.listen(port, () => {
  console.log(`Web Backend listening at http://localhost:${port}`)
})