import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'shiAdmin2024!', 12)
  
  const admin = await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: hashedPassword,
    },
  })
  console.log('Created admin user:', admin.username)

  // Create default drawings
  const drawings = [
    { date: 'Dec 1', fullDate: new Date('2024-12-01T18:00:00Z') },
    { date: 'Dec 15', fullDate: new Date('2024-12-15T18:00:00Z') },
    { date: 'Dec 22', fullDate: new Date('2024-12-22T18:00:00Z') },
    { date: 'Dec 29', fullDate: new Date('2024-12-29T18:00:00Z') },
  ]

  for (const d of drawings) {
    await prisma.drawing.upsert({
      where: { id: `drawing-${d.date.replace(' ', '-').toLowerCase()}` },
      update: {},
      create: {
        id: `drawing-${d.date.replace(' ', '-').toLowerCase()}`,
        date: d.date,
        fullDate: d.fullDate,
        status: 'upcoming',
      },
    })
  }
  console.log('Created drawings')

  // Create default prizes
  const prizes = [
    {
      name: 'Custom Jordan 1 Low',
      description: 'Off-White Inspired • Reconstructed',
      imageUrl: '/prize-1.jpg.jpeg',
      sponsor: 'JSM801',
      sponsorUrl: 'https://www.jsm801.com',
      drawingDate: 'Dec 1',
      order: 1,
    },
    {
      name: 'Custom Jordan 1 Low',
      description: 'Union LA Inspired • Reconstructed',
      imageUrl: '/prize-2.jpg.jpeg',
      sponsor: 'JSM801',
      sponsorUrl: 'https://www.jsm801.com',
      drawingDate: 'Dec 1',
      order: 2,
    },
  ]

  for (const prize of prizes) {
    await prisma.prize.create({
      data: prize,
    })
  }
  console.log('Created prizes')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



