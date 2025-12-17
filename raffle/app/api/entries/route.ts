import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromCookies } from '@/lib/auth'

// GET all entries (admin only)
export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminFromCookies()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const purchaseType = searchParams.get('purchaseType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: Record<string, string> = {}
    if (status) where.status = status
    if (purchaseType) where.purchaseType = purchaseType

    const [entries, total] = await Promise.all([
      prisma.entry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.entry.count({ where }),
    ])

    // Get stats
    const stats = await prisma.entry.aggregate({
      _sum: {
        ticketCount: true,
        amount: true,
      },
      _count: true,
    })

    return NextResponse.json({
      entries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        totalEntries: stats._count,
        totalTickets: stats._sum.ticketCount || 0,
        totalRevenue: stats._sum.amount || 0,
      },
    })
  } catch (error) {
    console.error('Error fetching entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new entry (for manual entry or Stripe webhook)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, ticketType, ticketCount, purchaseType, stripePaymentId, amount } = body

    // Generate unique ticket ID
    const ticketId = generateTicketId()

    const entry = await prisma.entry.create({
      data: {
        ticketId,
        email,
        name,
        ticketType,
        ticketCount,
        purchaseType,
        stripePaymentId,
        amount,
        status: 'active',
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'SHI-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}



