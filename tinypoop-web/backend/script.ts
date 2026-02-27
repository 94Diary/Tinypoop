import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const place = await prisma.place.create({
    data: {
      place_id: "PLACE_002",
      name: "SPU",
      address: "Bangkok, Thailand",
      description: "Public park",
      create_by: "admin",
    },
  })

  console.log(place)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())