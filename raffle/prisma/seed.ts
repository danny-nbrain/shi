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
    { date: 'Jan 15', fullDate: new Date('2026-01-15T18:00:00Z') },
    { date: 'Feb 1', fullDate: new Date('2026-02-01T18:00:00Z') },
    { date: 'Feb 15', fullDate: new Date('2026-02-15T18:00:00Z') },
    { date: 'Mar 1', fullDate: new Date('2026-03-01T18:00:00Z') },
    { date: 'Mar 15', fullDate: new Date('2026-03-15T18:00:00Z') },
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
      drawingDate: 'Jan 15',
      order: 1,
    },
    {
      name: 'Custom Jordan 1 Low',
      description: 'Union LA Inspired • Reconstructed',
      imageUrl: '/prize-2.jpg.jpeg',
      sponsor: 'JSM801',
      sponsorUrl: 'https://www.jsm801.com',
      drawingDate: 'Jan 15',
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




