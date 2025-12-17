import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromCookies } from '@/lib/auth'

// GET all prizes
export async function GET() {
  try {
    const prizes = await prisma.prize.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(prizes)
  } catch (error) {
    console.error('Error fetching prizes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new prize (admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromCookies()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, imageUrl, value, sponsor, sponsorUrl, drawingDate, order } = body

    const prize = await prisma.prize.create({
      data: {
        name,
        description,
        imageUrl,
        value,
        sponsor,
        sponsorUrl,
        drawingDate,
        order: order || 0,
        isActive: true,
      },
    })

    return NextResponse.json(prize, { status: 201 })
  } catch (error) {
    console.error('Error creating prize:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



