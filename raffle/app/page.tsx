'use client'

import { useSearchParams } from 'next/navigation'
import Header from './components/Header'
import Hero from './components/Hero'
import ImpactSection from './components/ImpactSection'
import PrizesSection from './components/PrizesSection'
import TicketsSection from './components/TicketsSection'
import TransparencySection from './components/TransparencySection'
import Footer from './components/Footer'

export default function Home() {
  const searchParams = useSearchParams()
  // Keep the public UI clean: only show the floating admin shortcut when explicitly requested.
  // Example: https://raffle.socialhealthinitiative.org/?admin=1
  const showAdminButton = searchParams.get('admin') === '1'

  const scrollToFreeTicket = () => {
    const ticketsSection = document.getElementById('tickets')
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      {/* Admin Toggle Button */}
      {showAdminButton && (
        <a
          href="/admin"
          className="fixed top-4 left-4 z-50 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Switch to Admin
        </a>
      )}

      <Header />
      <Hero onEarnFreeTicket={scrollToFreeTicket} />
      <ImpactSection />
      <PrizesSection />
      <TicketsSection />
      <TransparencySection />
      <Footer />
    </main>
  )
}
