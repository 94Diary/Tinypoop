const prisma = require('../config/db')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

exports.createUser = async (req, res) => {
  try {
    const { user_id, uuid, username, email, password, role } = req.body
    const newUser = await prisma.user.create({
      data: { user_id, uuid, username, email, password, role },
    })
    res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}