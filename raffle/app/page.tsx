'use client'

import Header from './components/Header'
import Hero from './components/Hero'
import ImpactSection from './components/ImpactSection'
import PrizesSection from './components/PrizesSection'
import TicketsSection from './components/TicketsSection'
import TransparencySection from './components/TransparencySection'
import Footer from './components/Footer'

export default function Home() {
  const scrollToFreeTicket = () => {
    const ticketsSection = document.getElementById('tickets')
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
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
