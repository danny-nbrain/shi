import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Find entry by Stripe payment ID (session becomes payment intent)
    const entry = await prisma.entry.findFirst({
      where: {
        OR: [
          { stripePaymentId: sessionId },
          { stripePaymentId: { contains: sessionId } },
        ],
      },
    })

    if (entry) {
      return NextResponse.json({
        success: true,
        ticketId: entry.ticketId,
        ticketCount: entry.ticketCount,
      })
    }

    // If not found, it might still be processing
    return NextResponse.json({
      success: true,
      ticketId: null,
      message: 'Payment processing. Ticket ID will be emailed shortly.',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



