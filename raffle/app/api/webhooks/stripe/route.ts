import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/db'
import Stripe from 'stripe'

// Ticket package mapping based on price
const PRICE_TO_PACKAGE: Record<number, { type: string; tickets: number }> = {
  500: { type: 'starter', tickets: 1 },
  2000: { type: 'supporter', tickets: 5 },
  3500: { type: 'connector', tickets: 10 },
  7500: { type: 'community_builder', tickets: 25 },
  20000: { type: 'school_champion', tickets: 100 },
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // If webhook secret is configured, verify signature
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } else {
      // For development, parse without verification
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutComplete(session)
      break
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await handlePaymentSuccess(paymentIntent)
      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  try {
    const email = session.customer_email || session.customer_details?.email
    const name = session.customer_details?.name || 'Anonymous'
    const amountTotal = session.amount_total || 0

    if (!email) {
      console.error('No email found in session')
      return
    }

    // Check if entry already exists for this payment
    const existingEntry = await prisma.entry.findFirst({
      where: { stripePaymentId: session.payment_intent as string },
    })

    if (existingEntry) {
      console.log('Entry already exists for this payment')
      return
    }

    // Determine ticket type based on amount
    const packageInfo = PRICE_TO_PACKAGE[amountTotal] || { type: 'custom', tickets: 1 }

    // Generate ticket ID
    const ticketId = generateTicketId()

    // Create entry
    await prisma.entry.create({
      data: {
        ticketId,
        email,
        name,
        ticketType: packageInfo.type,
        ticketCount: packageInfo.tickets,
        purchaseType: 'paid',
        stripePaymentId: session.payment_intent as string,
        amount: amountTotal / 100, // Convert cents to dollars
        status: 'active',
      },
    })

    console.log(`Created entry ${ticketId} for ${email}`)

    // TODO: Send confirmation email
  } catch (error) {
    console.error('Error handling checkout complete:', error)
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // This handles direct payment intents (not from checkout sessions)
  console.log('Payment succeeded:', paymentIntent.id)
}

function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'SHI-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}



