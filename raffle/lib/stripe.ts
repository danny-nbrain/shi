import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Ticket pricing configuration
export const TICKET_PACKAGES = {
  starter: {
    name: 'Connection Starter',
    tickets: 1,
    price: 5,
    pricePerEntry: 5.00,
    stripeLink: 'https://buy.stripe.com/dRmcN44dM7nuaoA2uJ4sE00',
  },
  supporter: {
    name: 'Connection Supporter',
    tickets: 5,
    price: 20,
    pricePerEntry: 4.00,
    stripeLink: 'https://buy.stripe.com/aFafZg9y65fmdAM3yN4sE01',
  },
  connector: {
    name: 'Connector',
    tickets: 10,
    price: 35,
    pricePerEntry: 3.50,
    // TODO: Set the correct $35 payment link for the 10-ticket package.
    stripeLink: '',
    popular: true,
  },
  community_builder: {
    name: 'Community Builder',
    tickets: 25,
    price: 75,
    pricePerEntry: 3.00,
    stripeLink: 'https://buy.stripe.com/cNiaEWcKi5fm68k4CR4sE02',
  },
  school_champion: {
    name: 'School Champion',
    tickets: 100,
    price: 200,
    pricePerEntry: 2.00,
    stripeLink: 'https://buy.stripe.com/6oUaEW5hQbDK40c4CR4sE03',
  },
} as const

export type TicketPackageKey = keyof typeof TICKET_PACKAGES

// Generate unique ticket ID
export function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'SHI-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

