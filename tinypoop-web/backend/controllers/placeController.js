const prisma = require('../config/db')

exports.getAllPlaces = async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      include: {
        manager: {
          select: {
            username: true,
            email: true
          }
        }
      }
    })
    res.json(places)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.createPlace = async (req, res) => {
  try {
    const { place_id, name, address, description, create_by, manager_id } = req.body
    const newPlace = await prisma.place.create({
      data: { place_id, name, address, description, create_by, manager_id },
    })
    res.status(201).json(newPlace)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create place' })
  }
}

exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.place.delete({ where: { id: id } })
    res.json({ message: 'Place deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Place not found' })
    res.status(500).json({ error: 'Failed to delete place' })
  }
}