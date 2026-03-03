const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Checking existing users...')
  
  // ล้างข้อมูลเก่าออกก่อน (Optional: ถ้าต้องการให้ข้อมูลเหมือนใน Script เป๊ะๆ)
  // await prisma.user.deleteMany({}) 

  const usersCount = await prisma.user.count()
  console.log(`Current users in DB: ${usersCount}`)

  console.log('Seeding new users...')
  
  // ใช้ upsert เพื่อให้รันซ้ำได้โดยไม่ Error (ถ้ามี user_id เดิมอยู่แล้วจะไม่อัปเดตซ้ำ)
  const userData = [
    {
      user_id: 'USER_001',
      uuid: 'uuid-1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'ADMIN'
    },
    {
      user_id: 'USER_002',
      uuid: 'uuid-2',
      username: 'staff1',
      email: 'staff1@example.com',
      password: 'password123',
      role: 'STAFF'
    },
    {
      user_id: 'USER_003',
      uuid: 'uuid-3',
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
      role: 'USER'
    }
  ]

  for (const u of userData) {
    await prisma.user.upsert({
      where: { user_id: u.user_id },
      update: {}, // ถ้าเจอ user_id เดิม ไม่ต้องทำอะไร
      create: u    // ถ้าไม่เจอ ให้สร้างใหม่
    })
  }

  const finalCount = await prisma.user.count()
  console.log(`Seeding finished. Total users in DB: ${finalCount}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())