const prisma = require('../../config/db')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' })
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
    const { user_id, uuid, username, email, password, role } = req.body
    const newUser = await prisma.user.create({
      data: { user_id, uuid, username, email, password, role },
    })
    res.status(201).json(newUser)
  } catch (error) {
    console.error("ERROR CREATE USER:", error)
    
    // เช็ค Error จาก Prisma (P2002 คือข้อมูลซ้ำ)
    if (error.code === 'P2002') {
      const field = error.meta.target.join(', ')
      return res.status(400).json({ error: `This ${field} is already taken.` })
    }
    
    res.status(500).json({ error: 'Failed to create user', detail: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { user_id, uuid, username, email, password, role } = req.body
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { user_id, uuid, username, email, password, role },
    })
    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update user' })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    res.json({ message: 'Login successful', user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Login failed' })
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