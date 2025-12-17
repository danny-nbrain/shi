import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromCookies } from '@/lib/auth'

// GET all drawings
export async function GET() {
  try {
    const drawings = await prisma.drawing.findMany({
      orderBy: { fullDate: 'asc' },
    })

    return NextResponse.json(drawings)
  } catch (error) {
    console.error('Error fetching drawings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new drawing (admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromCookies()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { date, fullDate } = body

    const drawing = await prisma.drawing.create({
      data: {
        date,
        fullDate: new Date(fullDate),
        status: 'upcoming',
      },
    })

    return NextResponse.json(drawing, { status: 201 })
  } catch (error) {
    console.error('Error creating drawing:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



