import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromCookies } from '@/lib/auth'

// POST - Spin the wheel and select a winner
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get the drawing
    const drawing = await prisma.drawing.findUnique({
      where: { id },
    })

    if (!drawing) {
      return NextResponse.json({ error: 'Drawing not found' }, { status: 404 })
    }

    if (drawing.status === 'completed') {
      return NextResponse.json(
        { error: 'Drawing has already been completed' },
        { status: 400 }
      )
    }

    // Get all active entries
    const entries = await prisma.entry.findMany({
      where: { status: 'active' },
    })

    if (entries.length === 0) {
      return NextResponse.json(
        { error: 'No entries available for drawing' },
        { status: 400 }
      )
    }

    // Create weighted entries (each ticket counts as one entry)
    const weightedEntries: typeof entries = []
    for (const entry of entries) {
      for (let i = 0; i < entry.ticketCount; i++) {
        weightedEntries.push(entry)
      }
    }

    // Select random winner
    const winnerIndex = Math.floor(Math.random() * weightedEntries.length)
    const winner = weightedEntries[winnerIndex]

    // Update drawing with winner
    const updatedDrawing = await prisma.drawing.update({
      where: { id },
      data: {
        status: 'completed',
        winnerId: winner.id,
        winnerName: winner.name,
      },
    })

    // Update winner entry status
    await prisma.entry.update({
      where: { id: winner.id },
      data: { status: 'winner' },
    })

    return NextResponse.json({
      success: true,
      drawing: updatedDrawing,
      winner: {
        id: winner.id,
        ticketId: winner.ticketId,
        name: winner.name,
        email: winner.email,
      },
      totalEntries: entries.length,
      totalTickets: weightedEntries.length,
    })
  } catch (error) {
    console.error('Error spinning wheel:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



