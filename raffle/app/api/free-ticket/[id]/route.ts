import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromCookies } from '@/lib/auth'

// Approve or reject a free ticket submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookies()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { action } = body // 'approve' or 'reject'

    const submission = await prisma.freeTicketSubmission.findUnique({
      where: { id },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    if (submission.status !== 'pending') {
      return NextResponse.json(
        { error: 'Submission has already been processed' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      // Create entry for the user
      const ticketId = generateTicketId()
      
      const entry = await prisma.entry.create({
        data: {
          ticketId,
          email: submission.email,
          name: submission.name,
          ticketType: 'free_task',
          ticketCount: 1,
          purchaseType: 'free',
          status: 'active',
        },
      })

      // Update submission
      await prisma.freeTicketSubmission.update({
        where: { id },
        data: {
          status: 'approved',
          reviewedAt: new Date(),
          reviewedBy: admin.username,
          entryId: entry.id,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Submission approved',
        entry,
      })
    } else if (action === 'reject') {
      await prisma.freeTicketSubmission.update({
        where: { id },
        data: {
          status: 'rejected',
          reviewedAt: new Date(),
          reviewedBy: admin.username,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Submission rejected',
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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



