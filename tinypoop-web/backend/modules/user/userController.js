const prisma = require('../../config/db')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.getUserById = async (req, res) =>{
  try {
    const {id} = req.params
    const user = await prisma.user.findUnique({where: {id:id}})
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' })
  }
}

exports.createUser = async (req, res) => {
  try {
    const { user_id, name, email, password, create_by } = req.body
    const newUser = await prisma.user.create({
      data: { user_id, name, email, password, create_by },
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id: id } })
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'User not found' })
    res.status(500).json({ error: 'Failed to delete user' })
  }
}